import GetEntities from '@js-entity-repos/core/dist/signatures/GetEntities';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): GetEntities<Entity> => {
  return async ({ filter, sort, pagination }) => {
    const params = {
      cursor: pagination.cursor,
      filter: JSON.stringify(filter),
      forward: pagination.forward,
      limit: pagination.limit,
      sort: JSON.stringify(sort),
    };
    const response = await Promise.resolve(config.axios.get('', { params }));

    const entities = response.data.entities.map(config.constructEntity);
    const nextCursor = response.data.nextCursor;
    const previousCursor = response.data.previousCursor;

    return { entities, nextCursor, previousCursor };
  };
};
