import main from '../..';

const handler = async (req, context) => {
  const body = req.body;

  if (body.email) {
    await main(body.email);
  }
};

export default handler;