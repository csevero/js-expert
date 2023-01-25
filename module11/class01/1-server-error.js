import http from 'http';

let count = 1;

async function handler(req, res) {
  count++;
  try {
    if (count % 2 === 0) {
      await Promise.reject('error dentro do handler');
    }

    //if we throw an error inside of for await without a try catch inside of it, the error doesn't be captured by the outside try catch context, because when we use for await the context is different, so to capture the error we need to create a try catch inside of the for await context
    for await (const data of req) {
      try {
        if (count % 2 !== 0) {
          await Promise.reject('error dentro do for');
        }
      } catch (err) {
        console.log('a request error has happened', err);
        res.writeHead(500);
        res.write(JSON.stringify({ message: 'internal server error!' }));
      } finally {
        res.end();
      }
    }
  } catch (err) {
    console.log('a server error has happened', err);
    res.writeHead(500);
    res.write(JSON.stringify({ message: 'internal server error!' }));
    res.end();
  }
}

http.createServer(handler).listen(3000, () => console.log('running at 3000'));
