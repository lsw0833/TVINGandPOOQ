var mysql = require('mysql');

class Database {
  constructor(host, user, password, port, database) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.port = port;
    this.database = database;
    this.dbConnection = null;
  }
  connectInMysql(callback) {
    this.dbConnection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      port: this.port,
      database: this.database
    });
    this.dbConnection.connect(function(err) {
      if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
      }
      callback(null);
    });
  }
  insertInMysql(datas, callback) {
    var sql = 'INSERT INTO datas (file,wallet,cost) VALUES(?,?,?)';
    var params = [datas.file,datas.wallet,datas.cost];
    this.dbConnection.query(sql, params, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
      callback(null);
    });
  }
  deleteInMysql(file,callback){
    var sql = "delete from datas where file=?";
    var params = [file];
    this.dbConnection.query(sql, params, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
      callback(null);
    });
  }
  selectInMysql(callback){
    var sql = "select * from datas";
    this.dbConnection.query(sql, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
      callback(rows);
    });
  }
  selectOneInMysql(id,callback){
    var sql = "select * from datas where id=?";
    var temp = id*1;
    var params = [temp];
    this.dbConnection.query(sql, params, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
      callback(rows);
    });
  }
}
module.exports = Database;
