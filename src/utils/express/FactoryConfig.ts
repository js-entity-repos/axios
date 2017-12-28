import Facade from '@js-entity-repos/core/dist/Facade';
import { TestEntity, TestId } from '@js-entity-repos/core/dist/tests/utils/testEntity';

export default interface Config {
  readonly port: number;
  readonly repo: Facade<TestId, TestEntity>;
  readonly route: string;
}
