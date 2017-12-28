import { Server } from 'http';
import expressFactory from './express/factory';
import memoryFactory from './memory/factory';

export interface Config {
  readonly port: number;
  readonly route: string;
}

export default (config: Config): Promise<Server> => {
  return expressFactory({
    port: config.port,
    repo: memoryFactory(),
    route: config.route,
  });
};
