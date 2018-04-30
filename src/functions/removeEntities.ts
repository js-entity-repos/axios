import RemoveEntities from '@js-entity-repos/core/dist/signatures/RemoveEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): RemoveEntities<E> => {
  return async ({ filter = {} }) => {
    const connection = await config.axios();
    const constructedFilter = config.constructFilter(filter);
    const params = { filter: JSON.stringify(constructedFilter) };
    await Promise.resolve(connection.delete('', { params }));
  };
};
