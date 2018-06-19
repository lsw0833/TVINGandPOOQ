const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
//const driver = new webdriver.Builder().forBrowser('firefox').build();

const By = webdriver.By;

class Crawler {
  constructor() {}
  crawlAtPOOQ(callback) {
    let driver = new webdriver.Builder().forBrowser('firefox').build();
    let link = [];
    let title = [];
    let channel = [];
    let img = [];
    const url = 'https://www.pooq.co.kr/live/genre.html';
    driver.get(url);
    var el = driver.findElement(By.className('live-sub-detail')).findElements(By.tagName('a'));
    var el2 = driver.findElement(By.className('live-sub-detail')).findElements(By.className('single-line'));
    var el3 = driver.findElement(By.className('live-sub-detail')).findElements(By.className('fc-purple'));
    var el4 = driver.findElement(By.className('live-sub-detail')).findElements(By.tagName('img'));
    //el.getAttribute('href').then(v=>console.log(v));
    el.then((e) => {
      for (var i = 0; i < e.length; i++) {
        link.push(e[i].getAttribute('href'));
      }
      Promise.all(link).then(function(values) {
        link = [];
        link = values;
      }).then(() => {
        el2.then((e) => {
          for (var i = 0; i < e.length; i++) {
            title.push(e[i].getText());
          }
          Promise.all(title).then((values) => {
            title = [];
            title = values;
          }).then(() => {
            el3.then((e) => {
              for (var i = 0; i < e.length; i++) {
                channel.push(e[i].getText());
              }
              Promise.all(channel).then((values) => {
                channel = [];
                channel = values;
              }).then(() => {
                el4.then((e) => {
                  for (var i = 0; i < e.length; i++) {
                    img.push(e[i].getAttribute('src'));
                  }
                  Promise.all(img).then(function(values) {
                    img = [];
                    img = values;
                  }).then(() => {
                    callback(link, title, channel, img);
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  crawlAtTVING(callback) {
    let link = [];
    let title = [];
    let channel = [];
    let img = [];
    let driver = new webdriver.Builder().forBrowser('firefox').build();
    const url = 'http://www.tving.com/live/list/onair';
    driver.get(url);
    var el = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.tagName('a'));
    var el2 = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.className('caption'));
    var el3 = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.className('caption-channal'));
    var el4 = driver.findElement(By.id('ID_LIVETOP2')).findElements(By.tagName('img'));
    //el.getAttribute('href').then(v=>console.log(v));
    el.then((e) => {
      for (var i = 0; i < e.length; i++) {
        link.push(e[i].getAttribute('href'));
      }
      Promise.all(link).then(function(values) {
        link = [];
        link = values;
      }).then(() => {
        el2.then((e) => {
          for (var i = 0; i < e.length; i++) {
            title.push(e[i].getText());
          }
          Promise.all(title).then((values) => {
            title = [];
            title = values;
          }).then(() => {
            el3.then((e) => {
              for (var i = 0; i < e.length; i++) {
                channel.push(e[i].getText());
              }
              Promise.all(channel).then((values) => {
                channel = [];
                channel = values;
              }).then(() => {
                el4.then((e) => {
                  for (var i = 0; i < e.length; i++) {
                    img.push(e[i].getAttribute('src'));
                  }
                  Promise.all(img).then(function(values) {
                    img = [];
                    img = values;
                  }).then(() => {
                    callback(link, title, channel, img);
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
module.exports = Crawler;
