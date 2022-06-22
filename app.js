
// Declaring global object variable
const gdpData = {};
// importing npm packages
const path = require("path");
const express = require("express");
const mysql = require("mysql");


// declaring npm express package as app
const app = express();
// this code is used to access the body properties of DOM
// to extract GET/POST requests
app.use(express.urlencoded({extended: false}));

const hostname = "localhost";
const port = 8080;

// Database connection
const connection = mysql.createConnection({
  host: "***REMOVED***",
  database: "covid19",
  user: "***REMOVED***",
  password: "***REMOVED***",
});

// This runs an sql query, cleans the results
// and outputs them in the specified file as needed
function sqlQuery(data, callback) {
  const sql = "SELECT iso2, cases FROM covid19 WHERE dates='" + data + "';";
  connection.query(sql, function(err, results, fields) {
    if (err) {
      throw err;
    }

    for (const i of results) {
      const test = i.iso2;
      const test2 = i.cases;
      gdpData[test] = test2;
    }
    stuffIWant = gdpData;
    return callback(gdpData);
  });
}

app.use(express.static("public"));
// This sends the index file when the homepage is requested
// via GET request (by visiting the website)
app.get("/", function(req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

// This code runs when a POST request is received on /ajaxcall url
// In this case we receive a post request containing
// the date picked on calendar,
// run a query using the date and send the results
// to the client to color the map accordingly
app.post("/ajaxcall", function(req, res) {
  let stuffIWant = {Test: "Not working"};
  const date = req.body.Date;
  sqlQuery(date, function(result) {
    stuffIWant = result;
    console.log(stuffIWant);
    res.send(stuffIWant);
  });
});

function listenResponse() {
  console.log("Server running at " + hostname + ":" + port + "/");
}
// This listens to a specific port if the environment gives one
// else it defaults to 3000 and runs a fuction when it is accessed
// const port = process.env.PORT || 3000;
app.listen(8080, listenResponse);
