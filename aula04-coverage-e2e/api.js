const http = require('http');
const DEFAULT_USER = { username: 'csevero', password: '123' };

//creating our routes use cases
const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },
  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);

      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write('logging failed!');
        return response.end();
      }
    }
    response.write('logging has succeeded');
    return response.end();
  },
  default: (request, response) => {
    response.write('hello world');
    return response.end();
  },
};

//our handler function responsible for receive and return responses
const handler = function (request, response) {
  const { url, method } = request;
  //create a default key to call our routes
  const routeKey = `${url}:${method.toLowerCase()}`;

  const chosen = routes[routeKey] || routes.default;

  response.writeHead(200, {
    'Content-Type': 'text/html',
  });

  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log('running at 3000'));

module.exports = app;
