const projectId = 'must-rpa';
const bucketName = 'must-rpa-object-store';

const config = {
  translateOpts: {
    parent: 'projects/726345247931',
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
    }
  },
  storageOpts: {
    projectId,
    bucketName,
  }
};

export default config;