import { promises as fsPromises} from 'fs';
import fs from 'fs';
import setsData from './eso-sets.mjs';

const SOURCE_FOLDER = "/mnt/d/images/eso/icons/";
const DESTINATION_FOLDER = "/mnt/d/projects/eso-gear/public/images/gear/";

const tryCopyFile = async (file) => {
  const dest = `${DESTINATION_FOLDER}${file}`;
  const src = `${SOURCE_FOLDER}${file}`;

  try {
    await fsPromises.copyFile(src, dest, fs.constants.COPYFILE_EXCL);
    console.log(`copied file ${file}`);
  } catch (err) {
      if (err.code !== 'EEXIST')
        console.error(err);
  }
}
const copyIcons = async () => {
  for (let i=0; i < setsData.length; i++) {
    const s = setsData[i];
    await tryCopyFile(s.image);
    for (let j=0; j < s.items.list.length; j++) {
      const item = s.items.list[j];
      await tryCopyFile(item.image);
    }
  }
}

copyIcons();
