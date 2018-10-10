let express= require('express')
let router = express.Router()
var Web3 = require('web3')

// Params property on the request object
// localhost:3000/person/thomas
router.get('/eth/api/v1/transaction/:TXID',(req,res)=>{
    let rpcUrl="https://mainnet.infura.io/v3/d634d0b1268d464998ee96b635069e4b";
    var web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
    var responce;
    var txId=req.query.TXID
    web3.eth.getTransaction(txId).then(data => {
        
             return responce={
            "block":{
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
            "status":recept.status,
            "depositeType":"account"
            }
          
        }).then (function(responce){
            res.send(responce);
        });
    
    
  
})

router.get('/error', (req, res) => {
  throw new Error('This is a forced error.')
})



module.exports = router