

import http from "http"

const http = require('http');
const os = require('os');

const PORT = 8090;

function simulateAsyncOperation() {
  return new Promise(resolve => {
    const delay = Math.random() * 2000; 
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function requestHandler(req, res) {
  await simulateAsyncOperation();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    if (req.url === '/info') {
      const info = {
        cpuModel: os.cpus()[0].model,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        platform: os.platform(),
        release: os.release()
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(info));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } else {
    res.writeHead(405);
    res.end('Method Not Allowed');
  }
}

const server = http.createServer(requestHandler);

server.listen(8090, () => {
  console.log(`Server is listening on port ${8090}`);
});
