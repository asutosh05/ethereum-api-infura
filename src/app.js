const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
const util = require('ethereumjs-util');
const app = express();

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/d634d0b1268d464998ee96b635069e4b"));

app.get('/eth/api/v1/transaction/:TXID',function(req,res){
        var responce;
        var inputData;
        // get transaction count, later will used as nonce
        web3js.eth.getTransaction(req.params.TXID).then(function(data){
            //If Ox the Account trastion
           if(data.input==='0x')
            {
                
                    responce={"block":{
                      "blockHeight":data.blockNumber
                    },
                    "outs":[
                      {
                        "address":data.to,
                        "value":data.value
                      }
                    ],
                    "ins":[
                      {
                        "address":data.from,
                        "value":"-"+data.value
                      }
                    ],
                    "hash":data.hash,
                    "currency":"ETH",
                    "chain":"ETH.main",
                    "status":"sucess",
                    "depositeType":"account"
                    }
                
            }
            else
            {
                let fromAddress=data.from;
                let inputdata=data.input.substr(2);
                let functionName= inputdata.slice(0,8)
                let toAddress=inputdata.slice(33,72)
                let value=inputdata.slice(72,136)
                let nones=inputdata.nones
                let contractAddress=('0x' + util.bufferToHex(util.rlphash([fromAddress, 0])).slice(26));
                let realvalue= parseInt(value, 16);
                responce={
                    
                        "block": {
                        "blockHeight": data.blockNumber
                        },
                        "outs": [
                        {
                        "address": toAddress,
                        "value": realvalue,
                        "type": "token",
                        "coinspecific": {
                        "tokenAddress": contractAddress
                        }
                        }
                        ],
                        "ins": [
                        {
                        "address": fromAddress,
                        "value": -1*realvalue,
                        "type": "token",
                        "coinspecific": {
                        "tokenAddress": contractAddress
                        }
                        }
                        ],
                        "hash":
                        data.hash,
                        "currency": "ETH",
                        "state": "confirmed",
                        "depositType": "Contract",
                        "chain": "ETH.main"
                        }
                
                
                

            }
            
            res.send(responce)
        }).catch(function(err){
            console.log(err)
        });
    });
app.listen(3000, () => console.log('Example app listening on port 3000!'))