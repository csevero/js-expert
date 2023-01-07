import { Readable, Writable } from 'stream';

//source data
const readable = Readable({
  read() {
    this.push('Hello world 1');
    this.push('Hello world 2');
    this.push('Hello world 3');

    //when the data finishes, we pass the null to inform to readable that it ends
    this.push(null);
  },
});

const writable = Writable({
  write(chunk, encoding, cb) {
    console.log('msg', chunk.toString());

    cb()
  },
});


readable
  //writable is always the ends of process
  .pipe(writable);
