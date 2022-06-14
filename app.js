var gdpData = {};
const path = require("path");
const mysql = require("mysql2");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));

const hostname = "localhost";
const port = 8080;

//Database connection
const connection = mysql.createConnection({
  host: "covid19.cfxoiisxjdjz.eu-central-1.rds.amazonaws.com",
  database: "covid19",
  user: "mainuser",
  password: "covid19userpass",
});


//This runs an sql query, cleans the results and outputs them in the specified file as needed
function sqlQuery(data, callback) {
  var sql = "SELECT iso2, cases FROM covid19 WHERE dates='" + data + "';"
  connection.query(sql, function (err, results, fields) {
    if (err) {
        throw err;
      }

      for (var i of results) {
        var test = i.iso2;
        var test2 = i.cases;
        gdpData[test] = test2;
      }
      stuffIWant = gdpData;
      return callback(gdpData);
    }
  );
}

app.use(express.static("public"));

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

function listenResponse() {
  console.log("Server running at " + hostname + ":" + port + "/");
}

app.post("/ajaxcall", function (req, res) {
  var stuffIWant = {Test:"Not working"}
  var date = req.body.Date;
  sqlQuery(date, function(result){
    stuffIWant = result;
    console.log(stuffIWant);
    res.send(stuffIWant);
  });
});

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});

//This listens to a specific port if the environment gives one, else it defaults to 3000 and runs a fuction when it is accessed
// const port = process.env.PORT || 3000;
app.listen(port, listenResponse);
