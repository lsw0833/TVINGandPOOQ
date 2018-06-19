const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/firefox');
const driver = new webdriver.Builder().forBrowser('firefox').build();
const By = webdriver.By;


var link = [];
var title =[];
var channel =[];
function crawlingPOOQ(){
  const url = 'https://www.pooq.co.kr/live/genre.html';
  driver.get(url);
  var el = driver.findElement(By.className('live-sub-detail')).findElements(By.tagName('a'));
  var el2 = driver.findElement(By.className('live-sub-detail')).findElements(By.className('single-line'));
  var el3 = driver.findElement(By.className('live-sub-detail')).findElements(By.className('fc-purple'));
  //el.getAttribute('href').then(v=>console.log(v));
  el.then((e)=>{
    for(var i=0; i<e.length; i++){
      link.push(e[i].getAttribute('href'));
    }
    Promise.all(link).then(function(values){
      link = [];
      link = values;
    }).then(()=>{
      el2.then((e)=>{
        for(var i=0; i<e.length; i++){
          title.push(e[i].getText());
        }
        Promise.all(title).then((values)=>{
          title = [];
          title = values;
        }).then(()=>{
          el3.then((e)=>{
            for(var i=0; i<e.length; i++){
              channel.push(e[i].getText());
            }
            Promise.all(channel).then((values)=>{
              channel = [];
              channel = values;
            }).then(()=>{
              for(var i =0; i<link.length; i++){
                console.log(link[i] +"  " +title[i] + " " + channal[i]);
              }
            });
          });
        });
      });
    });
  });
}
crawlingPOOQ();
