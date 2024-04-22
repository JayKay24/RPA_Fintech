# Task 2

This is a command line utility to translate a pdf document into english.

## Prerequisites

1. Select or create a Cloud Platform project.
2. Enable billing for your project.
3. Enable the Google Cloud Storage API.
4. Set up authentication with a service account so you can access the API from your local workstation.
5. Create your own GCP bucket and update [this](./src/config.js) configuration with your info.

## Installation

1. From the root of this repository, run `cd task3`;
2. `npm install`
3. `npm link`

## Usage

```
$ korean-to-english <your-pdf-in-non-english-language>
```

This will upload your pdf to gcp and translate using [Google Cloud Translate API](https://cloud.google.com/translate/docs/reference/rest). The translated doc will be saved locally.
