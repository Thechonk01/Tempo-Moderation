var mysql = require('mysql');
const { host, port, user, password, database } = require("./sql.json")

var con = mysql.createConnection({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
  upportBigNumbers: true
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

var sql = "";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result);
});
