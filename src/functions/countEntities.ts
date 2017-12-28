import CountEntities from '@js-entity-repos/core/dist/signatures/CountEntities';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): CountEntities<Entity> => {
  return async ({ filter }) => {
    const params = { filter: JSON.stringify(filter) };
    const response = await Promise.resolve(config.axios.get('/count', { params }));
    return { count: response.data };
  };
};
