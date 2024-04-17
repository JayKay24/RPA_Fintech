import { createWorker } from 'tesseract.js';

async function getTextFromImage(imageFile) {
  const worker = await createWorker('kor');
  const ret = await worker.recognize(imageFile);

  await worker.terminate();

  return ret.data;
}

export default getTextFromImage;