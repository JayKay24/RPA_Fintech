import { PdfReader } from 'pdfreader';

async function parsePdf(fileName) {
  let items = [];
  return new Promise((resolve, reject) => {
    new PdfReader().parseFileItems(fileName, (err, item) => {
      if (err) {
        console.log('Unable to parse pdf file:', fileName);
        console.error(err);
        reject(err);
        process.exit(1);
      } else if (!item) {
        resolve(items.join(' '));
        console.warn('end of file');
      } else if (item.text) {
        items.push(item.text);
      }
    });
  });
}

export default parsePdf;