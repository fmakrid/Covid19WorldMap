const fs = require("fs");
const path = require("path");
const express = require("express");
var $ = require("jQuery");
// var $;
// var jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;

// var $ = jQuery = require('jquery')(window);

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.use(express.static("public"));



app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

function listenResponse() {
  console.log("Server running at http://" + hostname + ":" + port + "/");
}

//This listens to a specific port and runs a fuction
app.listen(3000, hostname, listenResponse);
