import {
  beforeEach,
  describe,
  beforeAll,
  afterAll,
  expect,
  jest,
  test,
} from '@jest/globals';

//getting the temporary dir of OS (this can be different from Linux, Macos or Windows)
import { tmpdir } from 'os';
import fsPromises from 'fs/promises';
import { join } from 'path';
import { createLayersIfNotExists } from '../../src/createLayers.js';
import { createFiles } from '../../src/createFiles.js';
import Util from '../../src/util.js';

function getAllFunctionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
    method => method !== 'constructor',
  );
}

function generateFilesPath({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  return layers.map(layer => {
    // building the file name i.e. heroesFactory
    const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;
    // .../src/factory/heroesFactory.js
    return join(mainPath, defaultMainFolder, layer, filename);
  });
}

describe('#Integration - Files - Files Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    //sorting the array because the readdir brings the folders sorted by name
    layers: ['repository', 'service', 'factory'].sort(),
    componentName: 'heroes',
  };

  const packageJSON = 'package.json';
  //we're joining the complete path because the "npm t" runs from the package.json that is on the directory folder
  const packageJSONLocation = join('./test/integration/mocks/', packageJSON);

  beforeAll(async () => {
    //before all tests, we're creating a temporary directory using the .mkdtemp, this command will receive a prefix via parameter and will add six random characters in front of the prefix, in this example, our prefix is the "skeleton-", and we're joining it with the tmpdir() that will return the path of the Temporary OS directory
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'));
    await fsPromises.copyFile(
      packageJSONLocation,
      join(config.mainPath, packageJSON),
    );
    await createLayersIfNotExists(config);
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(tmpDirectory, { recursive: true });
  });

  test('Repository class should have create,read,update and delete methods', async () => {
    const myConfig = { ...config, layers: ['repository'] };

    await createFiles(myConfig);

    //generating our files
    const [repositoryFile] = generateFilesPath(myConfig);
    //using a dynamic import to check if the file is a valid JS file
    const { default: Repository } = await import(repositoryFile);

    //instancing our file created above
    const instance = new Repository();

    //creating an anchor function to returns jest rejects, validating the message returned by Promise.reject that is returned by our default file
    const expectNotImplemented = fn =>
      expect(() => fn.call()).rejects.toEqual('Method not implemented!');

    //validating all methods that we expect our file needs to has
    getAllFunctionsFromInstance(instance).forEach(method => {
      expectNotImplemented(instance[method]);
    });
  });

  test('Service should have the same signature of repository and call all its methods', async () => {
    const myConfig = { ...config, layers: ['repository', 'service'] };

    await createFiles(myConfig);

    //generating our files
    const [repositoryFile, serviceFile] = generateFilesPath(myConfig);
    //using a dynamic import to check if the file is a valid JS file
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);

    //instancing our file created above
    const repositoryInstance = new Repository();
    const serviceInstance = new Service({ repository: repositoryInstance });

    const allRepositoryMethods =
      getAllFunctionsFromInstance(repositoryInstance);

    allRepositoryMethods.forEach(method =>
      jest.spyOn(repositoryInstance, method).mockResolvedValue(),
    );

    //executing all service methods with serviceInstance by parameter (with it the serviceInstance will be "this")
    getAllFunctionsFromInstance(serviceInstance).forEach(method =>
      serviceInstance[method].call(serviceInstance, []),
    );

    allRepositoryMethods.forEach(method =>
      expect(repositoryInstance[method]).toHaveBeenCalled(),
    );
  });

  test('Factory instance should match layers', async () => {
    const myConfig = { ...config };

    await createFiles(myConfig);

    //generating our files
    const [factoryFile, repositoryFile, serviceFile] =
      generateFilesPath(myConfig);

    //using a dynamic import to check if the file is a valid JS file
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);

    //instancing our file created above
    const expectedInstance = new Service({ repository: new Repository() });
    const instance = Factory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(Service);
  });
});
