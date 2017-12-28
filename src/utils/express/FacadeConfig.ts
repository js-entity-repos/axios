import Facade from '@js-entity-repos/core/dist/Facade';
import { TestEntity, TestId } from '@js-entity-repos/core/dist/tests/utils/testEntity';

export default interface Config {
  readonly repo: Facade<TestId, TestEntity>;
}
