import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import CreateEntity from '@js-entity-repos/core/dist/signatures/CreateEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { CONFLICT } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): CreateEntity<E> => {
  return async ({ id, entity }) => {
    const data = config.constructDocument({ ...entity as any, id });
    const response = await config.axios.post('', data).catch((err) => {
      if (err.response.status === CONFLICT) {
        throw new ConflictingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
    return { entity: config.constructEntity(response.data) };
  };
};
