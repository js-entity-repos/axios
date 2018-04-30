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
    const connection = await config.axios();
    const constructedFilter = config.constructFilter(filter);
    const constructedSort = config.constructSort(sort);
    const params = {
      cursor: pagination.cursor,
      direction: pagination.direction,
      filter: JSON.stringify(constructedFilter),
      limit: pagination.limit,
      sort: JSON.stringify(constructedSort),
    };
    const response = await Promise.resolve(connection.get('', { params }));

    const entities = response.data.map(config.constructEntity);
    const backwardCursor = response.headers['x-entities-backward-cursor'];
    const forwardCursor = response.headers['x-entities-forward-cursor'];
    const hasMoreBackward = response.headers['x-entities-has-more-backward'] === 'true';
    const hasMoreForward = response.headers['x-entities-has-more-forward'] === 'true';

    return { entities, forwardCursor, backwardCursor, hasMoreBackward, hasMoreForward };
  };
};
