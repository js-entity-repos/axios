import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import createTestServer from '@js-entity-repos/express/dist/utils/createTestServer';
import axios from 'axios';
import { config } from 'dotenv';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import factory from './factory';
config();

const defaultServerPort = 1337;
const testServerPort = Number(
  process.env.port !== undefined
    ? process.env.port
    : defaultServerPort,
);
const testServerRoute = '/testentities';
const testServer = createTestServer({
  port: testServerPort,
  route: testServerRoute,
});

before(async () => {
  await testServer;
});

after(async () => {
  const server = await testServer;
  server.close();
});

facadeTest(factory<TestEntity>({
  axios: async () => axios.create({
    baseURL: `http://localhost:${testServerPort}${testServerRoute}`,
  }),
  entityName: 'Test Entity',
}));
