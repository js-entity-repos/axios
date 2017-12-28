import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import RemoveEntity from '@js-entity-repos/core/dist/signatures/RemoveEntity';
import { NOT_FOUND } from 'http-status-codes';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): RemoveEntity<Id> => {
  return async ({ id }) => {
    const params = { id: JSON.stringify(id) };
    await config.axios.delete('', { params }).catch((err) => {
      if (err.response.status === NOT_FOUND) {
        throw new MissingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
  };
};
