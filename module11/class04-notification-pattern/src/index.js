import { createServer } from 'http';
import HeroEntity from './heroEntity.js';
import { statusCode } from './util/httpStatusCodes.js';

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data);
      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('error connecting to DB!');
      }

      const hero = new HeroEntity(parsedData);
      
      if (!hero.isValid()) {
        response.writeHead(statusCode.BAD_REQUEST);
        response.end(hero.notifications.join('\n'));
        continue;
      }

      
      response.writeHead(statusCode.OK);
      response.end();
    } catch (error) {
      response.writeHead(statusCode.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log('running at port 3000'));

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Teste", "age": 24}'
 */
