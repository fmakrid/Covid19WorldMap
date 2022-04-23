const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const express = require("express");


const db = require("./data/database.js");
// require("./public/scripts/map.js");


const app = express();

const hostname = "127.0.0.1";
const port = 3000;



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "***REMOVED***",
  database: "covid19",
  dateStrings: true
});

var dates = "2020-12-14";

con.connect(function(err) {
  if (err) throw err;
    con.query("SELECT iso2 FROM covid19 WHERE dates ='" + dates + "';" , function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

function listenResponse() {
  console.log("Server running at http://" + hostname + ":" + port + "/");
}

app.post("/", function (req, res) {
  const pickedDate = req.body;
  const filePath = path.join(__dirname, "data", "pickedDate.json");

  const fileData = fs.readFileSync(filePath);
  const storedDates = JSON.parse(fileData);

  storedDates.push(pickedDate);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
});

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});

//This listens to a specific port and runs a fuction
app.listen(3000, hostname, listenResponse);
