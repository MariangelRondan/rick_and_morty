let http = require("http");
// const dataJSON = require(data.js);
let fs = require("fs");
const url = require("url");
const querystring = require("querystring");

const PORT = 3001;

const server = http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //CONFIGURA CORES. Permite acceso a la app desde cualquier ruta

    if (req.url.includes("/rickandmorty/character/")) {
      const urlSegment = req.url.split("/");
      fs.readFile("./utils/data.js", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("json not found");
        }
        if (data) {
          const character = data.filter((indice) => {
            parseInt(indice.id) === urlSegment[urlSegment.length - 1];
          });
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(JSON.stringify(character));
        }
      });
    }
  })
  .listen(PORT, "localhost");
