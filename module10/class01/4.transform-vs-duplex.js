import { Duplex, Transform } from 'stream';

let count = 0;

//Duplex can use the readable stream and the writable stream in the same time, and both methods are independents, how is shown above
const server = new Duplex({
  objectMode: true, //this brings that chunk already converted, without need to use .toString() on chunk, but it use more memory
  encoding: 'utf-8',
  read() {
    const everySecond = intervalContext => {
      if (count++ <= 5) {
        this.push('[readable] my name is Csevero\n');
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

  write(chunk, encoding, cb) {
    console.log(`[writable] saving`, chunk);
    cb();
  },
});

//we can active the writable method of duplex using the .write
server.write(`[Duplex] hey this is a writable\n`);

//we can active the writable method of duplex using the .on('data') or the .pipe
// server.on('data', msg => console.log(`[readable]${msg}`));
server.pipe(process.stdout);

//the push allow you to send more data to duplex
server.push(`[Duplex] hey this is also a readable\n`);

//transform is also a duplex stream, but doesnt have an independente communication
const transformToUpperCase = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  },
});

transformToUpperCase.write('[transform] hello from write!')
//the transform push will ignore all that is in the function
transformToUpperCase.push('[transform] hello from push!')


//redirect all data from readable to writable duplex
server.pipe(transformToUpperCase).pipe(server);
