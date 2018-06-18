var request = require('request');

class BlockChainParser {
  constructor(){}
  parseData(callback){
    var result=[];
    var options = {
      url: 'http://163.180.117.185:30300/blockChain',
      method: 'GET',
      headers: this.headers,
      json: true
    };
    request(options, (err, res, body) => {
      var blockChain = body.blockChain;
      for(var i =0; i<blockChain.length-3; i++){
        var dataInBlock = blockChain[i].data;
        for(var j=0; j<dataInBlock.length; j++){
            result.push(dataInBlock[j].TXData);
        }
      }
      callback(result);
    });
  }
  parseCoin(from,to,dataId,callback){
    var result = [];
    var options = {
      url: 'http://163.180.117.185:30300/blockChain',
      method: 'GET',
      headers: this.headers,
      json: true
    };
    request(options, (err, res, body) => {
      console.log(dataId);
      console.log(from);
      console.log(to);
      var blockChain = body.blockChain;
      for(var i =0; i<blockChain.length-3; i++){
        var coinInBlock = blockChain[i].coin;
        for(var j=0; j<coinInBlock.length; j++){
          if(coinInBlock[j].DATAID==dataId && coinInBlock[j].FROM == from && coinInBlock[j].TO ==to ){

            result.push(coinInBlock[j]);
          }
        }
      }
      callback(result);
    });
  }
}
module.exports = BlockChainParser;
