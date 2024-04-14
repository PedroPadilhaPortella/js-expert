import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import { createLayersIfNotExists } from '../../src/createLayers.js';
import fsPromises from 'fs/promises';
import fs from 'fs';

describe('#Layers - Folders Structure', () => {
  const defaultLayers = ['repository', 'service', 'factory'];

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should create folders if it doesnt exists', async () => {
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();

    await createLayersIfNotExists({ mainPath: '', defaultMainFolder: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
  });

  test('should not create folders if it exists', async () => {
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();

    await createLayersIfNotExists({ mainPath: '', defaultMainFolder: '', layers: defaultLayers })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).not.toHaveBeenCalled();
  });
});