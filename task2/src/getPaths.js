const { isFileAccessible } = require('../../fileInfo');

async function getPaths() {
  const cmdArgs = process.argv;
  const [_, file1, file2] = cmdArgs;
  await isFileAccessible(file1);
  await isFileAccessible(file2);

  return [file1, file2];
}

module.exports = {
  getPaths
};