import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import ReplaceEntity from '@js-entity-repos/core/dist/signatures/ReplaceEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { NOT_FOUND } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): ReplaceEntity<E> => {
  return async ({ id, entity, filter = {} }) => {
    const data = config.constructDocument({ ...entity as any, id });
    const constructedFilter = config.constructFilter(filter);
    const params = { filter: JSON.stringify(constructedFilter) };
    const response = await config.axios.put(`/${id}`, data, { params }).catch((err) => {
      if (err.response.status === NOT_FOUND) {
        throw new MissingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
    return { entity: config.constructEntity(response.data) };
  };
};
