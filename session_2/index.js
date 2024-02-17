const http = require("http");
const fs = require("fs");
const url = require("url")

const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") res.end();

  const log = `${Date.now()}: ${req.url} ${req.method} New request received\n`;
  const myUrl = url.parse(req.url, true)

  fs.appendFile("logs.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === 'GET') res.end("HomePage");
        break;
      case "/about":
        res.end("About Page");
        break;
      default:
        res.end("404 Not FOUND!");
    }
  });
});

myServer.listen(8000, () => console.log("Server started!!"));