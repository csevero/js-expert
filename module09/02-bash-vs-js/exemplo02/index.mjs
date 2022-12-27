$.verbose = false;

// using the timers/promises that allow us to pause the execution of our code without need callbacks like before
import { setTimeout } from 'timers/promises';
import isSafe from 'safe-regex';

// the $ is available because we installed the zx on the project, so with it we can run commands on bash and get the return of it
await $`docker run -p 8080:80 -d nginx`;
await setTimeout(500);

const req = await $`curl --silent localhost:8080`;
// showing the return from the above command using the zx
console.log(req.stdout);

const containers = await $`docker ps`;

// unsafe regex
// const exp = /(?<containerId>\w+)\W+(?=nginx)(x+x+)+y/;
const exp = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(exp)) throw new Error('unsafe regex');

const {
  groups: { containerId },
} = containers.toString().match(exp);

const logs = await $`docker logs ${containerId}`;
console.log('logs\n', logs.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log('rm\n', rm.stdout);
