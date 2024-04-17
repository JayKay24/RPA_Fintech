import getPaths from './getPaths.js';
import { convertToImage, getNumPages } from './convertToImage.js';


async function main() {
  const filePaths = await getPaths();
  const inputFile = filePaths[0],
    outputFile = filePaths[1] ?? 'output.pdf';

  const numPages = await getNumPages(inputFile);

  const imageFiles = [];

  for (let i = 1; i <= numPages; i++) {
    imageFiles.push(await convertToImage(inputFile, i));
  }

  console.log(imageFiles);

  // const imageText = await getTextFromImage(imageFile);

  // const items = await parsePdf(inputFile);
}

main();
