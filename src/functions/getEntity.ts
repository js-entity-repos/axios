import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import GetEntity from '@js-entity-repos/core/dist/signatures/GetEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { NOT_FOUND } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): GetEntity<E> => {
  return async ({ id, filter = {} }) => {
    const constructedFilter = config.constructFilter(filter);
    const params = { filter: JSON.stringify(constructedFilter) };
    const response = await config.axios.get(`/${id}`, { params }).catch((err) => {
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
