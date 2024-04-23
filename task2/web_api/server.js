import fastify from 'fastify';
import PDFMerger from 'pdf-merger-js';
import fastifyMultipart from '@fastify/multipart';
import { pipeline as pump } from 'stream';
import fs from 'fs';
import util from 'util';

const pipeline = util.promisify(pump);

const server = fastify({ logger: true });

server.register(fastifyMultipart, {
  files: 2,
  fileSize: 1000000
});

server.get('/', async (req, reply) => {
  reply.send({ hello: 'world' });
});

server.post('/upload', async (req, reply) => {
  const merger = new PDFMerger();
  const parts = req.files();
  const filenames = new Set();

  for await (const part of parts) {
    await pipeline(part.file, fs.createWriteStream(part.filename));
    filenames.add(part.filename);
  }

  for (const name of filenames) {
    await merger.add(name);
  }

  reply.send(await merger.saveAsBuffer());
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();