# Task 2

This is a command line utility to translate a pdf document into english.

## Prerequisites

1. [Select or create a Cloud Platform project](https://console.cloud.google.com/project).
2. [Enable billing for your project](https://support.google.com/cloud/answer/6293499#enable-billing).
3. [Enable the Google Cloud Storage API](https://console.cloud.google.com/flows/enableapi?apiid=storage-api.googleapis.com).
4. [Set up authentication with a service account so you can access the API from your local workstation](https://cloud.google.com/docs/authentication/getting-started).
5. Create your own [GCP bucket](https://cloud.google.com/storage/docs/creating-buckets) and update [this](./src/config.js) configuration with your info.

## Installation

1. From the root of this repository, run `cd task3`;
2. `npm install`
3. `npm link`

## Usage

```
$ korean-to-english <your-pdf-in-non-english-language>
```

This will upload your pdf to gcp and translate using [Google Cloud Translate API](https://cloud.google.com/translate/docs/reference/rest). The translated doc will be saved locally.
