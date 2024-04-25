const projectId = 'must-rpa';
const bucketName = 'must-rpa-object-store';
const projectNumber = 726345247931;


const config = {
  translateOpts: {
    parent: `projects/${projectNumber}/locations/global`,
    targetLanguageCode: 'en',
    sourceLanguageCode: 'ko',
    inputConfigs: [
      {
        mimeType: 'application/pdf',
        gcsSource: {
          inputUri: '',
        },
      },
    ],
    outputConfig: {
      gcsDestination: {
        outputUriPrefix: '',
      }
    },
  },
  storageOpts: {
    projectId,
    bucketName,
  },
  sleepFor: 10 * 1000,
};

export default config;