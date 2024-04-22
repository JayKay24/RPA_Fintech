import { extname } from 'path';
import isFileAccessible from './fileInfo.js';

async function getPaths() {
  const cmdArgs = process.argv;

  if (cmdArgs.length < 2) {
    console.log('Please provide a pdf file to read');
    process.exit(1);
  }

  const files = cmdArgs.slice(2);

  for (const file of files) {
    await isFileAccessible(file);
  }

  if (extname(files[0]) !== '.pdf') {
    console.log('file format should be pdf');
    process.exit(1);
  }

  return files;
}

export default getPaths;
