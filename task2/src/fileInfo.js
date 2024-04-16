import { access, stat } from 'fs/promises';
import { constants as fsConstants } from 'fs';

async function isFileAccessible(file) {
  try {
    const info = await stat(file);
    if (!info.isFile()) {
      throw new Error();
    }
    await access(file, fsConstants.R_OK);

    return file;
  } catch (error) {
    console.log(`Cannot read file ${file}`);
    console.error(error);
    process.exit(1);
  }
}

export default isFileAccessible;
