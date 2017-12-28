import * as express from 'express';
import { createServer, Server } from 'http';
import facade from './facade';
import FactoryConfig from './FactoryConfig';

export default ({ port, route, ...facadeConfig }: FactoryConfig) => {
  return new Promise<Server>((resolve) => {
    const app = express();
    app.use(route, facade(facadeConfig));
    const server = createServer(app);
    server.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Started test server on port ${port}`);
      resolve(server);
    });
  });
};
