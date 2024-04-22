import { extname } from 'path';
import isFileAccessible from './fileInfo.js';

async function getPaths() {
  const cmdArgs = process.argv;

  if (cmdArgs.length < 3) {
    console.log('Please provide two or more files to merge');
    process.exit(1);
  }

  const files = cmdArgs.slice(2);

  for (const file of files) {
    if (extname(file) !== '.pdf') {
      console.log('file format should be pdf');
      process.exit(1);
    }

    await isFileAccessible(file);
  }

  return files;
}

export default getPaths;
