import PDFMerger from 'pdf-merger-js';
import getPaths from './getPaths.js';

async function main() {
  const [pdf1, pdf2] = await getPaths();
  
  try {
    const merger = new PDFMerger();

    await merger.add(pdf1);
    await merger.add(pdf2);

    await merger.save('merged.pdf');
  } catch (error) {
    console.log('There was an error merging the pdf files');
    console.error(error);
    process.exit(1);
  }
}

main();
