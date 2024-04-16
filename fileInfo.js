const { access, stat } = require('fs/promises');
const { constants: fsConstants } = require('fs');

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

module.exports = { isFileAccessible }
