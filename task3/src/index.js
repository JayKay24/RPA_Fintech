import getPaths from './getPaths.js';
import { convertToImage, getNumPages } from './convertToImage.js';
import getTextFromImage from './getTextFromImage.js';


async function main() {
  const filePaths = await getPaths();
  const inputFile = filePaths[0],
    outputFile = filePaths[1] ?? 'output.pdf';

  const numPages = await getNumPages(inputFile);

  const imageFiles = [];

  for (let i = 1; i <= numPages; i++) {
    imageFiles.push(await convertToImage(inputFile, i));
  }

  const allData = [];

  for (const imageFile of imageFiles) {
    allData.push((await getTextFromImage(imageFile)));
  }

  for (const obj of allData) {
    console.log(Object.getOwnPropertyNames(obj));
  }

  // console.log('allData here!!!', allData);
}

main();
