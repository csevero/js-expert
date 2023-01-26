import { MongoClient } from 'mongodb';
import { createServer } from 'http';
import { promisify } from 'util';

async function dbConnect() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();

  console.log('mongodb is connected');

  const db = client.db('comics');

  return {
    collections: { heroes: db.collection('heroes') },
    client,
  };
}

const { collections, client } = await dbConnect();

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      });
      const heroes = await collections.heroes.find().toArray();

      console.log({ heroes });
      res.writeHead(200);
      res.write(JSON.stringify(heroes));
    } catch (err) {
      console.log('a request error has happened', err);
      res.writeHead(500);
      res.write(JSON.stringify({ message: 'internal server error' }));
    } finally {
      res.end();
    }
  }
}

// await client.close();
/**
 * curl -i localhost:3000 -X POST -- data '{"name": "Batman", "age": 12}'
 */

const server = createServer(handler).listen(3000, () =>
  console.log('running at 3000 and process', process.pid),
);

const onStop = async signal => {
  console.log(`\n${signal} signal received`);

  console.log('Closing http server');
  await promisify(server.close.bind(server))();
  console.log('Http server has closed');

  //you can pass .close(true) to force the mongodb finishes
  await client.close();
  console.log('Mongo connection has closed');

  //if you use .exit(1) the nodejs will understand that something wrong occurs, while .exit(0) is used when everything finish well
  process.exit(0);
};

// the SIGINT event handle with the ctrl+c event
// the SIGTERM event handle with the kill process
['SIGINT', 'SIGTERM'].forEach(event => {
  process.on(event, onStop);
});
