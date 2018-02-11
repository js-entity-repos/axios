import Facade from '@js-entity-repos/core/dist/Facade';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import factory from '@js-entity-repos/memory/dist/factory';

interface State {
  // tslint:disable-next-line:readonly-keyword
  entities: TestEntity[];
}

export default (): Facade<TestEntity> => {
  const state: State = { entities: [] };
  return factory({
    defaultPaginationLimit: 100,
    entityName: 'Test Entity',
    getEntities: () => state.entities,
    setEntities: (entities) => state.entities = entities,
  });
};
