import http from 'http';
import { Readable } from 'stream';

function api1(request, response) {
  // response.write('test01\n')
  // response.write('test02\n')
  // response.write('test03\n')

  // how the request is a readable stream, we can use the pipe with it and use the response on parameter because the response is a writable stream, so basically here we're getting all request and pass through
  // request.pipe(response)

  let count = 0;
  const maxItems = 99;
  const readable = new Readable({
    read() {
      const everySecond = intervalContext => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Csevero-${count}`,
            }) + '\n',
          );
          return;
        }

        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(
        //using a function we can pass the context of set interval to other function, allowing that we clear it outside
        function () {
          everySecond(this);
        },
      );
    },
  });

  readable.pipe(response);
}

function api2(request, response) {
  let count = 0;
  const maxItems = 99;
  const readable = new Readable({
    read() {
      const everySecond = intervalContext => {
        if (count++ <= maxItems) {
          this.push(
            JSON.stringify({
              id: Date.now() + count,
              name: `Joaozinho-${count}`,
            }) + '\n',
          );
          return;
        }

        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(
        //using a function we can pass the context of set interval to other function, allowing that we clear it outside
        function () {
          everySecond(this);
        },
      );
    },
  });

  readable.pipe(response);
}

http
  .createServer(api1)
  .listen(3000, () => console.log('server running at 3000'));
http
  .createServer(api2)
  .listen(4000, () => console.log('server running at 4000'));
