import { createServer } from 'http';
import BusinessError from './errors/businessError.js';
import { statusCode } from './util/httpStatusCodes.js';

function validateHero(hero) {
  //simulating a database error
  if (Reflect.has(hero, 'connectionError'))
    // just a generic error to simulate other scenario
    throw new Error('error connection to DB');

  if (hero.age < 20) throw new BusinessError('age must be higher than 20');

  if (hero.name?.length < 4)
    throw new BusinessError('age must be higher than 4');
}
async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);
      response.writeHead(statusCode.OK);
      response.end();
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCode.BAD_REQUEST);
        response.end(error.message);
        continue;
      }
      response.writeHead(statusCode.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log('running at port 3000'));

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Teste", "age": 24}'
 */
