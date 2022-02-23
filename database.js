var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "***REMOVED***",
  database: "covid19"
});

con.connect(function(err) {
  if (err){
      console.error("error connecting: " + err.stack);
      return;
  }
  con.query("SELECT * FROM covid19 WHERE id < 5", function (err, result, fields) {
    if (err){
        console.error("error connecting: " + err.stack);  
    }
    console.log(result);
  });
});