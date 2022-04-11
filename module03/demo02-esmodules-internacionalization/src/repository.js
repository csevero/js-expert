import { writeFile, readFile } from 'fs/promises';
export const save = async data => {
  //with ESModules the __dirname and __filename don't exist, so we need to do this to get the file directory
  const { pathname: databaseFile } = new URL(
    './../database.json',
    import.meta.url,
  );

  const currentData = JSON.parse(await readFile(databaseFile));
  currentData.push(data);

  await writeFile(databaseFile, JSON.stringify(currentData));
};
