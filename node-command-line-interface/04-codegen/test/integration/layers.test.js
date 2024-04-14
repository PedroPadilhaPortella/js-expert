import { afterAll, beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';
import fsPromises from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { createLayersIfNotExists } from '../../src/createLayers.js';

async function getFolders({ mainPath, defaultMainFolder }) {
  return  fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe('#Integration Layers - Folders Structure', () => {
  let tmpDirectory = '';
  const parameters = {
    mainPath: '',
    defaultMainFolder: 'src',
    layers: ['repository', 'service', 'factory'].sort()
  }

  beforeAll(async () => {
    parameters.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(tmpDirectory, { recursive: true });
  });

  test('should create folders if it doesnt exists', async () => {
    const beforeRun = await fsPromises.readdir(parameters.mainPath);

    await createLayersIfNotExists(parameters)

    const afterRun = await getFolders(parameters);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(parameters.layers);
  });

  test('should not create folders if it exists', async () => {
    const beforeRun = await await getFolders(parameters);

    await createLayersIfNotExists(parameters)

    const afterRun = await await getFolders(parameters);

    expect(afterRun).toEqual(beforeRun);
  });
});