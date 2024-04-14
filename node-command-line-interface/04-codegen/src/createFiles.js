import fsPromises from 'fs/promises';
import fs from 'fs';
import Util from './util.js';
import templates from './templates/index.js';
import { errorMessages } from './errorMessages.js';

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  }

  return dependencies[layer].map(Util.lowerCaseFirstLetter);
}

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(pendingFilesToWrite.map(({ fileName, template }) => {
    return fsPromises.writeFile(fileName, template);
  }));
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
  const keys = Object.keys(templates);

  const pendingFilesToWrite = [];

  for (const layer of layers) {
    const chosenTemplate = keys.find((key) => key.includes(layer));

    if (!chosenTemplate) return { error: errorMessages.INVALID_TEMPLATE };

    const template = templates[chosenTemplate];
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;

    const dependencies = defaultDependencies(layer, componentName);

    const { fileName, template: formattedTemplate } = template(componentName, ...dependencies);
    const fileNamePath = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`;

    pendingFilesToWrite.push({ fileName: fileNamePath, template: formattedTemplate });
  }

  await executeWrites(pendingFilesToWrite);

  return { success: true };
}