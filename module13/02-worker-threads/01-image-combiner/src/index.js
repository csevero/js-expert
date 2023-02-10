import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

//importing the sharp lib just to initialize lib and our worker thread can "use it"
import sharp from 'sharp';

import { dirname } from 'path';

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js';

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    //instancing a new Worker thread, is the same way that child process, we need to pass the module file that worker will run and if you want you can pass arguments to it, in our case we're passing the arguments by postMessage
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => {
      if (code !== 0) {
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`),
        );
      }

      console.log(`the thread ${worker.threadId} excited`);
    });
  });
}

async function handler(request, response) {
  if (request.url.includes('join-images')) {
    const {
      query: { background, img },
    } = parse(request.url, true);

    const imageBase64 = await joinImages({
      image: img,
      background,
    });

    response.writeHead(200, {
      'Content-type': 'text/html',
    });

    response.end(`<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}">`);
    return;
  }

  return response.end('ok');
}

createServer(handler).listen(3000, () => console.log('running at 3000'));

//https://pngimg.com/uploads/predator/predator_PNG6.png
//https://purepng.com/public/uploads/medium/purepng.com-predatorpredatoryautjahish-qu-tenfictionalextraterrestrialspeciesscience-fictionfranchisefilm-predatoralien-vs-predator-2004aliens-vs-predator-requiem-1701528656785j7dlv.png

// backgrounds
//https://clipartcraft.com/images/nature-clipart-forestry-7.png
//https://www.pixelstalk.net/wp-content/uploads/2016/06/Free-Download-Galaxy-Backgrounds-Tumblr.jpg
