import isFileAccessible from './fileInfo.js';

async function getPaths() {
  const cmdArgs = process.argv;

  if (cmdArgs.length < 3) {
    console.log('Please provide two files to merge');
    process.exit(1);
  }

  const [file1, file2] = cmdArgs.slice(2);

  await isFileAccessible(file1);
  await isFileAccessible(file2);

  return [file1, file2];
}

export default getPaths;
