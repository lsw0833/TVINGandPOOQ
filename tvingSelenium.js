const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/firefox');
const driver = new webdriver.Builder().forBrowser('firefox').build();
const By = webdriver.By;


let link = [];
let title =[];
let channal =[];
const url = 'http://www.tving.com/live/list/onair';
driver.get(url);
var el = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.tagName('a'));
var el2 = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.className('caption'));
var el3 = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.className('caption-channal'));
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
            channal.push(e[i].getText());
          }
          Promise.all(channal).then((values)=>{
            channal = [];
            channal = values;
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
