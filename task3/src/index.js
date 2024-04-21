import { TranslationServiceClient } from '@google-cloud/translate';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import getPaths from './getPaths.js';
import { convertToImage, getNumPages } from './convertToImage.js';
import getTextFromImage from './getTextFromImage.js';
import config from './config.js';


async function main() {
  const filePaths = await getPaths();
  let inputFile = filePaths[0],
    outputFile = filePaths[1] ?? 'output.pdf'

  const storage = await uploadFile(inputFile);

  await callTranslateDocument(inputFile, outputFile);

  await storage
    .bucket(config.storageOpts.bucketName)
    .file(outputFile)
    .download({ destination: outputFile });
  
  console.log(`File ${outputFile} stored to locally at ${outputFile}`);
}

async function callTranslateDocument(inputFile, outputFile) {
  const request = {
    ...config.translateOpts,
    inputConfigs: [
      {
        mimeType: 'application/pdf',
        gcsSource: {
          inputUri: `gs://${config.storageOpts.bucketName}/${inputFile}`,
        },
      }
    ],
    outputConfigs: {
      gcsDestination: {
        outputUriPrefix: `gs://${config.storageOpts.bucketName}/${outputFile}`,
      }
    }
  };

  const translationClient = new TranslationServiceClient();

  const [operation] = await translationClient.batchTranslateDocument(request);
  const [response] = await operation.promise();

  console.log('response here', response);
}

async function uploadFile(inputFile) {
  return new Promise((resolve, reject) => {
    const projectId = config.projectId;
    const bucketName = config.bucketName;

    const storage = new Storage({ projectId });
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(inputFile);
    const blobStream = blob.createWriteStream();

    fs.createReadStream(inputFile).pipe(blobStream);

    blobStream.on('error', err => {
      console.log('Unable to store file to cloud storage');
      console.error(err);
      reject(err);
      process.exit(1);
    });

    blobStream.on('finish', () => {
      console.log(`File ${outputFile} stored to cloud storage`);
      resolve(storage);
    });

    resolve();
  });
}

main();
