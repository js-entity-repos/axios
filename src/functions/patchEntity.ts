import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import PatchEntity from '@js-entity-repos/core/dist/signatures/PatchEntity';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { NOT_FOUND } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): PatchEntity<E> => {
  return async ({ id, patch, filter = {} }) => {
    const connection = await config.axios();
    const data = config.constructDocument({ ...patch as any, id });
    const constructedFilter = config.constructFilter(filter);
    const params = { filter: JSON.stringify(constructedFilter) };
    const response = await connection.patch(`/${id}`, data, { params }).catch((err) => {
      if (err.response.status === NOT_FOUND) {
        throw new MissingEntityError(config.entityName, id);
      }
      /* istanbul ignore next */
      throw err;
    });
    return { entity: config.constructEntity(response.data) };
  };
};
