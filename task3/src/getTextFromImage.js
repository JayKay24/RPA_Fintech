import { createWorker } from 'tesseract.js';

async function getTextFromImage(imageFile) {
  const worker = await createWorker('eng');
  const ret = await worker.recognize(imageFile);

  console.log('ret here', ret);

  await worker.terminate();

  return ret.data.text;
}

export default getTextFromImage;