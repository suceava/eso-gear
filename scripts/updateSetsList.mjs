import { promises as fs } from 'fs';
import setsList from './eso-sets.mjs';

const FILE_NAME = 'eso-sets.mjs';

// remove path from image names
const fixImagePaths = () => {
  // remove path from images
  setsList.forEach(s => {
    s.image = s.image.replace('/icons/', '');
    s.items.list.forEach(i => {
      i.image = i.image.replace('/icons/', '');
    })
  });
}

const updateData = async () => {
  // fixImagePaths();  // DONE

  // write to file
  const content = 'const ESO_SETS = ' +
    JSON.stringify(setsList, null, 2) + ';' +
    '\n' +
    'export default ESO_SETS;';
  try {
    await fs.writeFile(FILE_NAME, content);

    console.log(`Sets data written to ${FILE_NAME}`);
  } catch (err) {
    console.error(err);
  }
}

updateData();
