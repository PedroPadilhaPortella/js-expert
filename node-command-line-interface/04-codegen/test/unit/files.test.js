import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import fsPromises from 'fs/promises';
import { createFiles } from '../../src/createFiles.js';
import templates from '../../src/templates/index.js';

describe('#Layers - Files Structure', () => {
  const defaultLayers = ['repository', 'service', 'factory'];
  const parameters = {
    mainPath: './',
    defaultMainFolder: 'src',
    layers: defaultLayers,
    componentName: 'heroes'
  }

  const repositoryLayer = `${parameters.componentName}Repository`;
  const serviceLayer = `${parameters.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should not create file structure for an invalid template', async () => {
    const params = { ...parameters, layers: ['invalid-layer'] }
    const expected = { error: '[Error] Invalid template provided' }
    const result = await createFiles(params);
    expect(result).toStrictEqual(expected);
  });

  test('repository should not contain any aditional dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: '', template: '' });

    const params = { ...parameters, layers: ['repository'] }
    const expected = { success: true }
    const result = await createFiles(params);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(params.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(params.componentName);
  });

  test('service should contain repository as an dependency', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.serviceTemplate.name)
      .mockReturnValue({ fileName: '', template: '' });

    const params = { ...parameters, layers: ['repository', 'service'] }
    
    const expected = { success: true }
    const result = await createFiles(params);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(params.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(params.componentName, repositoryLayer);
  });

  test('factory should contain repository and service as dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ fileName: '', template: '' });

    const params = { ...parameters }
    
    const expected = { success: true }
    const result = await createFiles(params);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(params.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(params.componentName, repositoryLayer, serviceLayer);
  });
});