const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/firefox');
const driver = new webdriver.Builder().forBrowser('firefox').build();
const By = webdriver.By;
const url = 'http://www.tving.com/live/list/onair';
driver.get(url);

var link = [];
var title =[];
var channal =[];

var el = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.tagName('a'));

//el.getAttribute('href').then(v=>console.log(v));
el.then((e)=>{
  for(var i=0; i<e.length; i++){
    link.push(e[i].getAttribute('href'));
  }
  Promise.all(link).then(function(values){
    console.log(values);
  });
});
var el2 = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.className('caption'));
el2.then((e)=>{
  for(var i=0; i<e.length; i++){
    e[i].getText().then(v=>title.push(v));
  }
});
var el3 = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.className('caption-channal'));
el3.then((e)=>{
  for(var i=0; i<e.length; i++){
    e[i].getText().then(v=>channal.push(v));
  }
});
