import { parentPort } from 'worker_threads';
import sharp from 'sharp';
import axios from 'axios';

async function downloadFile(url) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  return response.data;
}

async function onMessage({ image, background }) {
  const firstLayer = await sharp(await downloadFile(image))
    // .grayscale()
    // .rotate(90)
    .resize(600)
    .toBuffer();

  const secondLayer = await sharp(await downloadFile(background))
    .resize(1920, 1080)
    .composite([
      { input: firstLayer, gravity: sharp.gravity.south },
      { input: firstLayer, gravity: sharp.gravity.east },
      { input: firstLayer, gravity: sharp.gravity.west },
    ])
    .toBuffer();

  parentPort.postMessage(secondLayer.toString('base64'));
}

parentPort.on('message', onMessage);
