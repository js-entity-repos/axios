import Entity from '@js-entity-repos/core/dist/types/Entity';
import { json } from 'body-parser';
import { Router } from 'express';
import countEntities from './countEntities';
import createEntity from './createEntity';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import getEntities from './getEntities';
import getEntity from './getEntity';
import patchEntities from './patchEntities';
import removeEntities from './removeEntities';
import removeEntity from './removeEntity';
import replaceEntity from './replaceEntity';

export default <E extends Entity>(factoryConfig: FactoryConfig<E>): Router => {
  const facadeConfig: FacadeConfig<E> = {
    ...factoryConfig,
  };
  const router = Router();

  router.use(json());

  router.get('/count', countEntities(facadeConfig));
  router.delete('/:id', removeEntity(facadeConfig));
  router.get('/:id', getEntity(facadeConfig));
  router.patch('/:id', patchEntities(facadeConfig));
  router.put('/:id', replaceEntity(facadeConfig));
  router.delete('', removeEntities(facadeConfig));
  router.get('', getEntities(facadeConfig));
  router.post('', createEntity(facadeConfig));

  return router;
};
