// this a demonstration of streams, the ls list all files from directory, pass the result to next command after pipe (|), run a filter from result, get the filter and pass to next command a so on
//ls | grep package | xargs cat | jq.name

//getting the user input with stdin, and using the pipe to get it and send to .on('data') that will print the data on user's console
// process.stdin
//   .pipe(process.stdout)
//   .on('data', msg => console.log('data', msg.toString()))
//   .on('error', msg => console.log('error', msg.toString()))
//   .on('end', _ => console.log('end'))
//   .on('close', _ => console.log('close'));

//creating a socket server and connecting a terminal to it, using the pipe to show the messages sent by terminal connected
//terminal 1
//node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"

//terminal 2
//node -e "process.stdin.pipe(require('net').connect(1338))"

//generating a big file
//node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http';
import { createReadStream, readFileSync } from 'fs';

http
  .createServer((req, res) => {
    // bad way
    // const file = readFileSync('big.file').toString();
    // res.write(file);
    // res.end();

    //
    createReadStream('big.file').pipe(res);
  })
  .listen(3000, () => console.log('running on port 3000'));
