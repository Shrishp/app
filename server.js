const http = require('http');
const PORT = process.env.PORT || 80;
http.createServer((req, res) => res.end('Hello from Docker CI!')).listen(PORT);
