async function blockMediaDownLoad(page) {
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (
      request.resourceType() ==='media' ||
      request.resourceType() === 'image' ||
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