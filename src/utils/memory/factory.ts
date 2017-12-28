import Facade from '@js-entity-repos/core/dist/Facade';
import { TestEntity, TestId } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import facade from '@js-entity-repos/memory/dist/facade';

interface State {
  // tslint:disable-next-line:readonly-keyword
  entities: TestEntity[];
}

export default (): Facade<TestId, TestEntity> => {
  const state: State = { entities: [] };
  return facade({
    entityName: 'Test Entity',
    getEntities: () => state.entities,
    setEntities: (entities) => state.entities = entities,
  });
};
