import { TranslationServiceClient } from '@google-cloud/translate';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import getPaths from './getPaths.js';
import config from './config.js';


async function main() {
  const filePaths = await getPaths();
  let inputFile = filePaths[0];

  await uploadFile(inputFile);

  await sleep();

  await callTranslateDocument(inputFile);

  const [inputFileWithoutExtension, ext] = inputFile.split('.');

  const outputFile = `${config.storageOpts.projectId}-object-store_${inputFileWithoutExtension}_${config.translateOpts.targetLanguageCode}_translations.${ext}`;

  const storage = new Storage(),
    bucketName = config.storageOpts.bucketName,
    downloadOpts = {
      destination: outputFile,
    }

  await storage.bucket(bucketName).file(outputFile).download(downloadOpts);
  
  console.log(`${outputFile} stored to locally at: ${outputFile}`);
}

main();

async function sleep() {
  return new Promise((resolve, reject) => {
    console.log('sleeping...');
    setTimeout(() => {
      console.log('awake now');
      resolve();
    }, config.sleepFor);
  });
}

async function callTranslateDocument(inputFile) {
  const translationClient = new TranslationServiceClient();

  const request = {
    parent: translationClient.locationPath(config.storageOpts.projectId, 'global'),
    documentInputConfig: {
      gcsSource: {
        inputUri: `gs://${config.storageOpts.bucketName}/${inputFile}`,
      },
    },
    documentOutputConfig: {
      gcsDestination: {
        outputUriPrefix: `gs://${config.storageOpts.bucketName}/`,
      },
    },
    targetLanguageCode: 'en',
  };

  await translationClient.translateDocument(request);
}

async function uploadFile(inputFile) {
  return new Promise((resolve, reject) => {
    const projectId = config.storageOpts.projectId;
    const bucketName = config.storageOpts.bucketName;

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
      console.log(`File ${inputFile} stored to cloud storage`);
      resolve(storage);
    });

    resolve();
  });
}
