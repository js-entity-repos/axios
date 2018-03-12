import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): GetEntities<E> => {
  const defaultPagination = {
    cursor: undefined,
    forward: true,
    limit: config.defaultPaginationLimit,
  };
  const defaultSort = { id: true } as Sort<E>;
  return async ({ filter = {}, sort = defaultSort, pagination = defaultPagination }) => {
    const constructedFilter = config.constructFilter(filter);
    const constructedSort = config.constructSort(sort);
    const params = {
      cursor: pagination.cursor,
      filter: JSON.stringify(constructedFilter),
      forward: pagination.forward,
      limit: pagination.limit,
      sort: JSON.stringify(constructedSort),
    };
    const response = await Promise.resolve(config.axios.get('', { params }));

    const entities = response.data.map(config.constructEntity);
    const nextCursor = response.headers['x-entities-next-cursor'];
    const previousCursor = response.headers['x-entities-previous-cursor'];

    return { entities, nextCursor, previousCursor };
  };
};
