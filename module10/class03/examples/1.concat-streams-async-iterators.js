import { pipeline } from 'stream/promises';

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

//writable stream
async function* output(streams) {
  for await (const data of streams) {
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
  }
}

// passthrough stream
async function* merge(streams) {
  for (const readable of streams) {
    //with setEncoding we can work with object mode without need to convert our chunks to string every time
    readable.setEncoding('utf8');

    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line;
      }
    }
  }
}

await pipeline(merge(results), output);
