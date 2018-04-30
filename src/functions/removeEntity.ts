import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import RemoveEntity from '@js-entity-repos/core/dist/signatures/RemoveEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { NOT_FOUND } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): RemoveEntity<E> => {
  return async ({ id, filter = {} }) => {
    const connection = await config.axios();
    const constructedFilter = config.constructFilter(filter);
    const params = { filter: JSON.stringify(constructedFilter) };
    await connection.delete(`/${id}`, { params }).catch((err) => {
      if (err.response.status === NOT_FOUND) {
        throw new MissingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
  };
};
