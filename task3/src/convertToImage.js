import fs from 'fs';
import path from 'path';
import pdfPageCount from 'pdf-page-counter';
import { fromPath } from 'pdf2pic';
import { fileURLToPath } from 'url';

async function getNumPages(fileName) {
  return new Promise((resolve, reject) => {
    let dataBuffer = fs.readFileSync(fileName);

    pdfPageCount(dataBuffer)
      .then((data) => {
        resolve(data.numpages);
      })
      .catch((err) => {
        console.log('Unable to get number of pages');
        console.error(err);
        reject(err);
        process.exit(1);
      });
  });
}

async function convertToImage(fileName, pageNum) {
  const fileNameOmitExt = path.basename(fileName, path.extname(fileName));

  const options = {
    savePath: path.join(path.dirname(fileURLToPath(import.meta.url)), 'images'),
    format: 'png',
    saveFilename: fileNameOmitExt,
    preserveAspectRatio: true,
    width: 1440,
    quality: 100
  };
  
  const convert = fromPath(fileName, options);

  return new Promise((resolve, reject) => {
    convert(pageNum, { responseType: 'image' })
      .then((res) => {
        console.log('res here');
        console.log(res);
        resolve(res.path);

        return res;
      })
      .catch(err => {
        console.log('Unable to convert to image');
        console.error(err);
        reject();
        process.exit(1);
      });
  });
}

export { convertToImage, getNumPages };
