import mergePdfs from '../..';

const handler = async (req, context) => {
  const formData = await req.formData();
  const buffer = await mergePdfs(formData);

  return new Response(buffer);
};

export default handler;