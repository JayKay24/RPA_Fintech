import PDFMerger from 'pdf-merger-js';
import getPaths from './getPaths.js';

async function main() {
  const pdfs = await getPaths();
  
  try {
    const merger = new PDFMerger();

    for (const pdf of pdfs) {
      await merger.add(pdf);
    }

    await merger.save('merged.pdf');
    console.log('Successfully saved to merged.pdf');
  } catch (error) {
    console.log('There was an error merging the pdf files');
    console.error(error);
    process.exit(1);
  }
}

main();
