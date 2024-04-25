# Task 2 Command Line Interface

This is a command line utility to merge two pdfs together

## Installation

1. From the root of this repository, run `cd task2`;
2. `npm install`
3. `npm link`

## Usage

```
$ pdf-merger <pdf1> <pdf2> <0 or more pdfs>
```

This will create a pdf called `merged.pdf` in your current working directory.

# Task 2 Web API route

## Description

Send a POST request to the endpoint `https://must-rpa.netlify.app/.netlify/functions/server` deployed as a Netlify serverless function.

This endpoint accepts a POST request with `multipart/form-data` content and returns a Buffer response.

## Endpoint

- **Method:** POST
- **URL:** `/https://must-rpa.netlify.app/.netlify/functions/server`
- **Content Type:** `multipart/form-data`

## Request Body

The request body should contain a file uploaded as `file`.

## Response

The response will be a Buffer containing the content of the uploaded file.

## Example Usage

### Request

```http
POST https://must-rpa.netlify.app/.netlify/functions/server HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="example.pdf"
Content-Type: application/pdf

This is the content of the file.
----WebKitFormBoundary7MA4YWxkTrZu0gW
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/octet-stream

<Buffer 25 50 44 46 ...> <!-- PDF binary data -->
```

