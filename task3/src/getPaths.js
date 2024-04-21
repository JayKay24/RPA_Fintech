import isFileAccessible from './fileInfo.js';

async function getPaths() {
  const cmdArgs = process.argv;

  if (cmdArgs.length < 2) {
    console.log('Please provide a pdf file to read');
    process.exit(1);
  }

  const files = cmdArgs.slice(2);

  for (const file of files) {
    // if (!isNaN(parseInt(file))) continue;
    await isFileAccessible(file);
  }

  return files;
}

export default getPaths;
