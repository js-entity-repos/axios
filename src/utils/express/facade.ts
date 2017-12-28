import { json } from 'body-parser';
import { Router } from 'express';
import countEntities from './countEntities';
import deleteEntities from './deleteEntities';
import FacadeConfig from './FacadeConfig';
import getEntities from './getEntities';
import patchEntities from './patchEntities';
import postEntities from './postEntities';
import putEntities from './putEntities';
import upsertEntities from './upsertEntities';

export default (config: FacadeConfig): Router => {
  const router = Router();

  router.use(json());

  router.get('/count', countEntities(config));
  router.post('/upsert', upsertEntities(config));
  router.delete('', deleteEntities(config));
  router.get('', getEntities(config));
  router.patch('', patchEntities(config));
  router.post('', postEntities(config));
  router.put('', putEntities(config));

  return router;
};
