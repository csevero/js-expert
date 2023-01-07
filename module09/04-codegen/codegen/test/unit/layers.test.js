import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import { createLayersIfNotExists } from '../../src/createLayers.js';
import fsPromises from 'fs/promises';
import fs from 'fs';

describe('#Layers - Folder Structure', () => {
  const defaultLayers = ['service', 'factory', 'repository'];

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should create folders if not it doesnt exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockReturnValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({
      mainPath: '',
      defaultMainFolder: 'src',
      layers: defaultLayers,
    });

    expect(fs.existsSync).toBeCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).toBeCalledTimes(defaultLayers.length);
  });

  test('should not create folders if not it exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockReturnValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({
      mainPath: '',
      defaultMainFolder: 'src',
      layers: defaultLayers,
    });

    expect(fs.existsSync).toBeCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).not.toHaveBeenCalled();
  });
});
