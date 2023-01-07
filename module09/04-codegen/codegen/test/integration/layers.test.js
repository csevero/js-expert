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

async function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe('#Integration - Layers - Files Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    //sorting the array because the readdir brings the folders sorted by name
    layers: ['repository', 'service', 'factory'].sort(),
  };

  beforeAll(async () => {
    //before all tests, we're creating a temporary directory using the .mkdtemp, this command will receive a prefix via parameter and will add six random characters in front of the prefix, in this example, our prefix is the "skeleton-", and we're joining it with the tmpdir() that will return the path of the Temporary OS directory
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromises.rm(tmpDirectory, { recursive: true });
  });

  test('should not create folders if it exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);

    //run

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });

  test('should create folders if it doesnt exists', async () => {
    const beforeRun = await getFolders(config);
    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);
    expect(beforeRun).toEqual(afterRun);
  });
});
