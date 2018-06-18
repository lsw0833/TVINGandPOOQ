var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');
var expressErrorHandler = require('express-error-handler');
var config = require('./config');
var route_loader = require('./route/route_loader');
var fs = require('fs');
var crypto = require('crypto');
var database = require('./model/database');
var request = require('request');
var app = express();
var multer = require('multer'); // multer모듈 적용 (for 파일업로드))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || config.server_port);
app.use('/views', express.static(__dirname + "/views"));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
var db = new database('127.0.0.1', 'root', 'rootpw', 3306, 'ds');

app.use('/public', static(path.join(__dirname, 'public')));

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    }
  }),
});
app.post('/upload', upload.single('img'), (req, res) => {
  var wallet = req.query.s_wallet || req.body.s_wallet;
  var cost = req.query.cost || req.body.cost;
  wallet = wallet.trim();
  cost = cost.trim();
  var flag = 1;
  if (wallet && cost && req.file) {
    if(!isNaN(cost)){
      if(cost > 0){
        flag = 3;
      }
    }
  }
  if (flag==3) {
    var datas = {
      file: req.file.filename,
      wallet: wallet,
      cost: cost
    };
    db.insertInMysql(datas, () => {});
    var data = fs.readFileSync('./uploads/' + req.file.filename);
    var hash = crypto.createHash('sha256').update(data).digest('base64');
    hash = crypto.createHash('sha256').update(hash+wallet).digest('base64');
    var options = {
      url: 'http://163.180.117.185:30300/dataShop',
      method: 'POST',
      headers: this.headers,
      json: true,
      form: {TXID :req.file.filename, TXdata : hash}
    };
    request(options, (err, res, body) => {});
  }
  res.render('main.ejs', {
    pass: flag
  });
});
route_loader.init(app, express.Router());
var errorhandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});
app.use(expressErrorHandler.httpError(404));

app.use(errorhandler);


http.createServer(app).listen(app.get('port'), function() {
  console.log('서버가 시작됨 포트 : ' + app.get('port'));
  db.connectInMysql(() => {
    console.log("Mysql start!");
  });
});
