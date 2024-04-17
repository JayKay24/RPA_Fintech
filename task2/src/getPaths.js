import isFileAccessible from './fileInfo.js';

async function getPaths() {
  const cmdArgs = process.argv;

  if (cmdArgs.length < 3) {
    console.log('Please provide two or more files to merge');
    process.exit(1);
  }

  const files = cmdArgs.slice(2);

  for (const file of files) {
    await isFileAccessible(file);
  }

  return files;
}

export default getPaths;
