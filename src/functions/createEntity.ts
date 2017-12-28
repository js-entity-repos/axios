import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import CreateEntity from '@js-entity-repos/core/dist/signatures/CreateEntity';
import { CONFLICT } from 'http-status-codes';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): CreateEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const data = config.constructDocument(id, entity);
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
