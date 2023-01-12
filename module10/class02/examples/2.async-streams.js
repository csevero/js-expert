import { pipeline } from 'stream/promises';
import { setTimeout } from 'timers/promises';

async function* myCustomReadable() {
  yield Buffer.from('This is my');
  await setTimeout(100);
  yield Buffer.from('This is readable');
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_');
  }
}

async function* myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = [];
  for await (const chunk of stream) {
    console.log('[duplex]', chunk);
    bytesRead += chunk.length;
    wholeString.push(chunk);
  }

  yield `wholeString ${wholeString.join()}`;
  yield `bytesRead ${bytesRead}`;
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log('[writable]', chunk.toString());
  }
}

try {
  const controller = new AbortController();

  //if you need to cancel a pipeline flow, you can use the AbortController to do it, your pipeline needs to have the signal property defined
  //to stop a pipeline execution you can use the code below
  setImmediate(() => controller.abort());
  
  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomDuplex,
    myCustomWritable,
    { signal: controller.signal },
  );

  console.log('process finished');
} catch (error) {
  console.error('', error.message);
}
