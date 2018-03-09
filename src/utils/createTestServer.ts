import expressFactory from '@js-entity-repos/express/dist/factory';
import * as express from 'express';
import { createServer, Server } from 'http';
import memoryRepo from './memoryRepo';

export interface Config {
  readonly port: number;
  readonly route: string;
}

export default ({ port, route }: Config): Promise<Server> => {
  return new Promise<Server>((resolve) => {
    const app = express();
    app.use(route, expressFactory({
      service: memoryRepo(),
    }));
    const server = createServer(app);
    server.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Started test server on port ${port}`);
      resolve(server);
    });
  });
};
