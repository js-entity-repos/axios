import CountEntities from '@js-entity-repos/core/dist/signatures/CountEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): CountEntities<E> => {
  return async ({ filter = {} }) => {
    const connection = await config.axios();
    const constructedFilter = config.constructFilter(filter);
    const params = { filter: JSON.stringify(constructedFilter) };
    const response = await Promise.resolve(connection.get('/count', { params }));
    return { count: response.data };
  };
};
