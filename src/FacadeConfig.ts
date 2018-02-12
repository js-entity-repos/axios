import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Filter } from '@js-entity-repos/core/dist/types/Filter';
import Sort from '@js-entity-repos/core/dist/types/Sort';
import { AxiosInstance } from 'axios';

export type Document = any;

export default interface FacadeConfig<E extends Entity> {
  readonly axios: AxiosInstance;
  readonly constructDocument: (patch: Partial<E>) => Document;
  readonly constructEntity: (document: Document) => E;
  readonly constructFilter: (filter: Filter<E>) => any;
  readonly constructSort: (sort: Sort<E>) => any;
  readonly defaultPaginationLimit: number;
  readonly entityName: string;
}
