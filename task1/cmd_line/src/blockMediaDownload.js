async function blockMediaDownLoad(page) {
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (
      request.url().endsWith('.woff') ||
      request.url().endsWith('.woff2') ||
      request.resourceType() ==='media' ||
      request.resourceType() ==='texttrack' ||
      request.resourceType() === 'image' ||
      // request.resourceType() === 'stylesheet' ||
      request.resourceType() === 'other' && request.url().endsWith('.exe')
    ) {
      request.abort();
    } else {
      request.continue()
    }
  });

  return page;
}

export default blockMediaDownLoad;