const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8003;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  answer = `[
    {"action":"connect",
    "from":"447418343509",
    "endpoint":
      [
          {"type":"phone",
          "number":"${query.to}"}
      ]}, 
      {
      "action": "conversation",
      "name": "Daniel"}]`
  res.end(answer);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});