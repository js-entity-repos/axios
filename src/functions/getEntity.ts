import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import { NOT_FOUND } from 'http-status-codes';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): GetEntity<Id, Entity> => {
  return async ({ id }) => {
    const params = { id: JSON.stringify(id) };
    const response = await config.axios.get('', { params }).catch((err) => {
      if (err.response.status === NOT_FOUND) {
        throw new MissingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
    const entity = config.constructEntity(response.data);
    return { entity };
  };
};
