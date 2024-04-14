$.verbose = false

import { setTimeout } from 'timers/promises';
import isSafe from 'safe-regex';

await $`docker run -p "8080:80" -d nginx`;

await setTimeout(1000);

const request = $`curl --silent localhost:8080`;

const containers = await $`docker ps`;

const expression = /(?<containerId>\w+)\W+(?=nginx)/;

if(!isSafe(expression)) {
  throw new Error('Unsafe regex!');
}

const {groups: { containerId} } = containers.toString().match(expression);

const logs = await $`docker logs ${containerId}`;
console.log('Logs:', logs.stdout)

const rm = await $`docker rm -f ${containerId}`;
console.log('Removed rm -f:', rm.stdout)
