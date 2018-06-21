var Crawler = require('../model/crawler');
var crawler = new Crawler();
var p_link = [];
var p_title = [];
var p_channel = [];
var p_img = [];
var t_link = [];
var t_title = [];
var t_channel = [];
var t_img = [];
function renewTVING(){
  console.log("TVING renew");
  crawler.crawlAtTVING((link,title,channel,img)=>{
    t_link = [];
    t_link = link;
    t_title = [];
    t_title = title;
    t_channel = [];
    t_channel = channel;
    t_img = [];
    t_img = img;
    for(var i =0; i<t_img.length; i++){
      if(t_img[i]=="http://www.tving.com/public_v4/portal/css/img/adult19.png"){
        t_img.splice(i,1);
      }
    }
    console.log("complete renew TVING`s channel");
  });
}
function renewPOOQ(){
  console.log("POOQ renew");
  crawler.crawlAtPOOQ((link,title,channel,img)=>{
    p_link = [];
    p_link = link;
    p_title = [];
    p_title = title;
    p_channel = [];
    p_channel = channel;
    p_img = [];
    p_img = img;
    console.log("complete renew POOQ`s channel");
  });
}
var home = function(req, res) {
  res.render('main.ejs');
};
var onair = function(req, res) {
    res.send({"p_link" : p_link, "p_title" : p_title , "p_channel" : p_channel,"p_img" : p_img,
     "t_link" : t_link, "t_title" : t_title , "t_channel" : t_channel, "t_img" : t_img});
};
module.exports.home = home;
module.exports.onair = onair;
module.exports.renewPOOQ = renewPOOQ;
module.exports.renewTVING = renewTVING;
