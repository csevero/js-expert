InjectHttpInterceptor();

import http from 'http';
import { InjectHttpInterceptor } from '../index.js'

//request to localhost and get headers
//curl -i localhost:3000

function handleRequest(request, response) {
  // response.setHeader('X-Instrumented-by', 'Csevero')
  response.end('Hello world')
}

const server = http.createServer(handleRequest)
const port = 3000

server.listen(port, () => console.log(`server running at`, server.address().port))