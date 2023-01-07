import { Readable, Writable, Transform } from 'stream';
import { createWriteStream } from 'fs';

//readable is always the source data
const readable = Readable({
  read() {
    for (let index = 0; index < 1e5; index++) {
      const person = { id: Date.now() + index, name: `csevero-${index}` };
      const data = JSON.stringify(person);
      this.push(data);
    }

    //when the data finishes, we pass the null to inform to readable that it ends
    this.push(null);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;

    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;

    cb(null, 'id,name\n'.concat(chunk));
  },
});

const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);

    const result = `${data.id},${data.name.toUpperCase()}\n`;

    cb(null, result);
  },
});

//the writable is responsible for show the data to customer, save the data on a file, or pass it to other place
// const writable = Writable({
//   write(chunk, encoding, cb) {
//     console.log('msg', chunk.toString());

//     cb();
//   },
// });

/**
 * The process is:
 *  readable is our source data
 *  the first pipe is a transform stream to get data and transform it in other
 *  the second pipe is a transform stream to get the data and add a data do chunk
 *  the last pipe is a writable stream to get the result and write a file
 */
const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  //writable is always the ends of process, output, saving, ignoring
  // .pipe(writable);
  // .pipe(process.stdout);
  .pipe(createWriteStream('my.csv'));

pipeline.on('end', () => console.log('finished'));
