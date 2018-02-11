import * as express from 'express';
import { createServer, Server } from 'http';
import expressFactory from './expressPresenter/factory';
import memoryRepo from './memoryRepo';

export interface Config {
  readonly port: number;
  readonly route: string;
}

export default ({ port, route }: Config): Promise<Server> => {
  return new Promise<Server>((resolve) => {
    const app = express();
    app.use(route, expressFactory({
      repo: memoryRepo(),
    }));
    const server = createServer(app);
    server.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Started test server on port ${port}`);
      resolve(server);
    });
  });
};
