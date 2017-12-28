import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import facadeTest from '@js-entity-repos/core/dist/tests';
import { TestEntity, TestId } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import axios from 'axios';
import { config } from 'dotenv';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import facade from './facade';
import createTestServer from './utils/createTestServer';
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
  const app = await testServer;
  app.close();
});

facadeTest(facade<TestId, TestEntity>({
  axios: axios.create({
    baseURL: `http://localhost:${testServerPort}${testServerRoute}`,
  }),
  constructDocument: (id, patch) => ({ ...patch, ...id }),
  constructEntity: (document) => document,
  entityName: 'Test Entity',
}));
