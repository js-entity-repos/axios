import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import OverwriteEntity from '@js-entity-repos/core/dist/signatures/OverwriteEntity';
import { NOT_FOUND } from 'http-status-codes';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): OverwriteEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const data = config.constructDocument(id, entity);
    const response = await config.axios.put('', data).catch((err) => {
      if (err.response.status === NOT_FOUND) {
        throw new MissingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
    return { entity: config.constructEntity(response.data) };
  };
};
