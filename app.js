const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const express = require("express");

const db = require("./data/database.js");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  database: "covid19",
  user: "root",
  password: "***REMOVED***"
});

var pickedDate = "2020-12-14";
var cases;

//This runs an sql query, cleans the results and outputs them in the specified file as needed
function sqlQuery() {
  var gdpData = {};

  connection.query(
  "SELECT iso2, cases FROM covid19 WHERE dates='" + pickedDate + "';",
  function (err, results, fields) {
    const filePath = path.join(__dirname, "public","scripts", "pickedDate.json");
    const fileData = fs.readFileSync(filePath);
    const storedDates = JSON.parse(fileData);

    for(var i of results){      
      var test = i.iso2;
      var test2 = i.cases;
      gdpData[test] = test2;
    }
    // storedDates.push(gdpData);
    // fs.writeFileSync(filePath, JSON.stringify(storedDates));
  }
  );  
  return gdpData;
}

app.use(express.static("public"));

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

function listenResponse() {
  console.log("Server running at http://" + hostname + ":" + port + "/");
}

app.get("/ajaxcall", function (req, res) {
  // res.send(sqlQuery());
});

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});

//This listens to a specific port and runs a fuction
app.listen(3000, hostname, listenResponse);
