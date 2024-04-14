import { afterAll, beforeAll, beforeEach, describe, jest, test } from '@jest/globals';
import fsPromises from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { createLayersIfNotExists } from '../../src/createLayers.js';
import Util from '../../src/util.js';
import { createFiles } from '../../src/createFiles.js';

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
  return layers.map((layer) => {
    const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;
    return join(mainPath, defaultMainFolder, layer, fileName);
  });
}

function getAllFuntionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance))
    .filter((method) => method !== 'constructor')
}

describe('#Integration Layers - Files Structure', () => {
  const parameters = {
    mainPath: '',
    defaultMainFolder: 'src',
    layers: ['repository', 'service', 'factory'].sort(),
    componentName: 'heroes'
  }

  const packageJsonLocation = join('./test/integration/mocks/package.json');

  beforeAll(async () => {
    parameters.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
    await fsPromises.copyFile(packageJsonLocation, join(parameters.mainPath, 'package.json'))
    await createLayersIfNotExists(parameters);
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(tmpDirectory, { recursive: true });
  });

  test('Repository class should have create, read, update and delete methods', async () => {
    const params = { ...parameters, layers: ['repository'] }

    await createFiles(params);
    const [repositoryFile] = generateFilePath(params);
    const { default: Repository } = await import(repositoryFile);

    const expectedNotImplemented = (fn) => expect(() => fn.call()).rejects.toEqual('method not implemented!');

    const repository = new Repository();
    expectedNotImplemented(repository.create);
    expectedNotImplemented(repository.read);
    expectedNotImplemented(repository.update);
    expectedNotImplemented(repository.delete);
  });

  test('Service class should have create, read, update and delete methods', async () => {
    const params = { ...parameters, layers: ['repository', 'service'] }

    await createFiles(params);
    const [repositoryFile, serviceFile] = generateFilePath(params);

    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);

    const repository = new Repository();
    const service = new Service({ repository });

    const allRepositoryMethods = getAllFuntionsFromInstance(repository);

    allRepositoryMethods.forEach((method) => {
      jest.spyOn(repository, method).mockResolvedValue();
    });

    getAllFuntionsFromInstance(repository).forEach((method) => {
      service[method].call(service, [])
    });

    allRepositoryMethods.forEach((method) => {
      expect(repository[method]).toHaveBeenCalled();
    });
  });

  test('Factory instances should match layers', async () => {
    const params = { ...parameters }

    await createFiles(params);
    const [factoryFile, repositoryFile, serviceFile] = generateFilePath(params);

    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);

    const expectedInstance = new Service({ repository: new Repository() });
    const instance = Factory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(Service);
  });
});