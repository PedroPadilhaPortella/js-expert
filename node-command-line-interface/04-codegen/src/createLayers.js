import fsPromises from 'fs/promises';
import fs from 'fs';

export async function createLayersIfNotExists({ mainPath, defaultMainFolder, layers }) {
  const defaultPath = `${mainPath}/${defaultMainFolder}`;

  const missingFolders = layers.filter((layer) => !fs.existsSync(layer));
  
  const results = missingFolders.map((folder) => {
    return fsPromises.mkdir(`${defaultPath}/${folder}`, { recursive: true });
  });

  return Promise.all(results);
}