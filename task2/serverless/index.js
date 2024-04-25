import PDFMerger from 'pdf-merger-js';

async function mergePdfs(formData) {
  const merger = new PDFMerger();

  for (const file of formData.values()) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await merger.add(buffer);
  }

  const buffer = await merger.saveAsBuffer();

  return buffer;
}

export default mergePdfs;