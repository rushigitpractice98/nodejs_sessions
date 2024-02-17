const http = require("http");
const fs = require("fs");

const cores = require("os");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New request received\n`;

  fs.appendFile("logs.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("About Page");
        break;
      default:
        res.end("404 Not FOUND!");
    }
  });
  console.log("cores==>>>", cores.cpus())
});

myServer.listen(8000, () => console.log("Server started!!"));
