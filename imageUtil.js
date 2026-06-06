import { createWorker } from 'tesseract.js';

const recognizeImage = async (imageUrl) => {
  const worker = await createWorker('eng');
  const ret = await worker.recognize(imageUrl);
  await worker.terminate();
  return ret.data.text;
}

export default recognizeImage;