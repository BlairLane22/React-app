var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "BlairLane",
  password: "123456789",
  database: "mydb"
});

con.connect(function(err) {
  if (err) {
    throw err;
  }

  console.log("Connected!");
  var sql = "CREATE TABLE customers (email VARCHAR(255), password NVARCHAR(255))";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
