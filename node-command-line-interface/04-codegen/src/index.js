#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createLayersIfNotExists } from './createLayers.js';
import { createFiles } from './createFiles.js';

const { argv: { componentName } } = yargs(hideBin(process.argv))
  .command('skeleton', 'create project skeleton', (builder) => {
    return builder.option('component-name', {
      alias: 'c',
      demandOption: true,
      describe: 'component\'s name',
      type: 'array'
    })
      .example('codegen skeleton --component-name product', 'creates a project with a single domain')
      .example('codegen skeleton --c heroes -c villains -c players', 'creates a project with a list of all domains')
  })
  .epilog('copyright 2024 - PedroPadilhaPortella');

const env = process.env.NODE_ENV;
const defaultMainFolder = env === "dev" ? "tmp" : "src";

const layers = ['repository', 'service', 'factory'].sort();

const parameters = {
  mainPath: '.',
  defaultMainFolder,
  layers
}

await createLayersIfNotExists(parameters);

const pendingPromises = []

for(const domain of componentName) {
  const result = createFiles({ ...parameters, componentName: domain });
  pendingPromises.push(result);
}

await Promise.all(pendingPromises);