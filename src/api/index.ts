import { router } from 'express-file-routing';
import type { AddressInfo } from 'net';
import { createLogger } from '@logger';
import express from 'express';
import path from 'path';

const Logger = createLogger('Server', 'API');
const server = express();

server.use('/', router({
  directory: path.resolve(__dirname, 'routes')
}));

const listener = server.listen(process.env.API_PORT, () => {
  const { address, port } = listener.address() as AddressInfo;

  Logger.success(`Listening on ${address}${port}`);
});