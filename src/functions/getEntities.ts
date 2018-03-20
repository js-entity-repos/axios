import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Pagination from '@js-entity-repos/core/dist/types/Pagination';
import { forward } from '@js-entity-repos/core/dist/types/PaginationDirection';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import { asc } from '@js-entity-repos/core/dist/types/SortOrder';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>): GetEntities<E> => {
  const defaultPagination: Pagination = {
    cursor: undefined,
    direction: forward,
    limit: config.defaultPaginationLimit,
  };
  const defaultSort = { id: asc } as Sort<E>;
  return async ({ filter = {}, sort = defaultSort, pagination = defaultPagination }) => {
    const constructedFilter = config.constructFilter(filter);
    const constructedSort = config.constructSort(sort);
    const params = {
      cursor: pagination.cursor,
      direction: pagination.direction,
      filter: JSON.stringify(constructedFilter),
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
