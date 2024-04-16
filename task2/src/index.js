const PDFMerger = require('pdf-merger-js');
const { getPaths } = require('./getPaths');

async function main() {
  const [pdf1, pdf2] = getPaths();
  const merger = new PDFMerger();

  await merger.add(pdf1);
  await merger.add(pdf2);

  await merger.save('merged.pdf');
}

main()