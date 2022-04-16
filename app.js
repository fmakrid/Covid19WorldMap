const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.use(express.static("public"));
// app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

function listenResponse() {
  console.log("Server running at http://" + hostname + ":" + port + "/");
}

//This listens to a specific port and runs a fuction
app.listen(3000, hostname, listenResponse);
