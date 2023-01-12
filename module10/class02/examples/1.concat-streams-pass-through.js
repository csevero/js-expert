import { Writable, PassThrough } from 'stream';
import axios from 'axios';
const API_01 = 'http://localhost:3000';
const API_02 = 'http://localhost:4000';

const requests = await Promise.all([
  axios({
    method: 'GET',
    url: API_01,
    responseType: 'stream',
  }),
  axios({
    method: 'GET',
    url: API_02,
    responseType: 'stream',
  }),
]);

const results = requests.map(({ data }) => data);

const output = new Writable({
  write(chunk, enc, cb) {
    const data = chunk.toString().replace(/\n/, '');
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
    cb();
  },
});

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    //avoid that streams ends by itself
    current.pipe(prev, { end: false });

    //how we defined that prev stream doesn't auto end, we define the below method to listen when the current stream are ended and check if all streams are ended also to finalize the prev stream
    current.on('end', () => items.every(stream => stream.ended) && prev.end());

    return prev;
  }, new PassThrough());
}

merge(results).pipe(output);

// results[0].pipe(output);
// results[1].pipe(output);
