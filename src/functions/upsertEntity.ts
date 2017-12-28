import UpsertEntity from '@js-entity-repos/core/dist/signatures/UpsertEntity';
import Config from '../Config';

export default <Id, Entity extends Id>(config: Config<Id, Entity>): UpsertEntity<Id, Entity> => {
  return async ({ id, entity }) => {
    const data = config.constructDocument(id, entity);
    const response = await Promise.resolve(config.axios.post('/upsert', data));
    return { entity: config.constructEntity(response.data) };
  };
};
