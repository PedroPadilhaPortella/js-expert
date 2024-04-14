import yargs from "yargs";
import { hideBin } from 'yargs/helpers';

// node cli-yargs.mjs createHero --name Flash --age 32 --power speed
// node cli-yargs.mjs createHero --n Hulk --a 42 --p strength
// node cli-yargs.mjs createHero --n Batman --a 48 --p richness

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })

const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a hero', (builder) => {
    return builder
      .option('name', { alias: 'n', demandOption: true, describe: 'hero name', type: 'string' })
      .option('age', { alias: 'a', demandOption: true, describe: 'hero age', type: 'number' })
      .option('power', { alias: 'p', demandOption: true, describe: 'hero power', type: 'string' })
      .example('createHero --name Flash --age 32 --power speed', 'create a hero')
      .example('createHero --n Hulk --a 42 --p strength', 'create a hero')
  })
  .epilog('copyright 2024  @pedroPadilhaPortella')

console.log(hero(argv))