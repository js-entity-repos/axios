import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import PatchEntity from '@js-entity-repos/core/dist/signatures/PatchEntity';
import { NOT_FOUND } from 'http-status-codes';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): PatchEntity<Id, Entity> => {
  return async ({ id, patch }) => {
    const data = config.constructDocument(id, patch);
    const response = await config.axios.patch('', data).catch((err) => {
      if (err.response.status === NOT_FOUND) {
        throw new MissingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
    return { entity: config.constructEntity(response.data) };
  };
};
