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

async function blobToBuffer(blob) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(blob);
  });
}

export default mergePdfs;