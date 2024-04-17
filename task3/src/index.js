import { PdfReader } from 'pdfreader';
import { readFile } from 'fs/promises';
import { promisify } from 'util';
import getPaths from './getPaths.js';

async function main() {
  const filePaths = await getPaths();
  const inputFile = filePaths[0],
    outputFile = filePaths[1] ?? 'output.pdf';

  const pdfReader = new PdfReader();
  const unBoundParseFileItems = await promisify(pdfReader.parseFileItems);
  const parseFileItems = unBoundParseFileItems.bind(pdfReader);

  try {
    const fileItems = await parseFileItems(inputFile);
    console.log(fileItems);
  } catch (error) {
    console.log('Unable to parse pdf file:', inputFile);
    console.error(error);
  }
}

main();