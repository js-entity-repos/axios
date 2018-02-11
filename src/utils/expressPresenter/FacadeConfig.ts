import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';

export default interface FacadeConfig<E extends Entity> {
  readonly repo: Facade<E>;
}
