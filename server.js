const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.get("/", function handleRequest(request, response) {
  response.send("Hello World\n");
});

function listenResponse() {
  console.log("Server running at http://" + hostname + ":" + port + "/");
}

//This listens to a specific port and runs a fuction
app.listen(3000, hostname, listenResponse);
