import { AxiosInstance } from 'axios';

export type Document = any;

export default interface Config<Id, Entity> {
  readonly constructDocument: (id: Id, patch: Partial<Entity>) => Document;
  readonly constructEntity: (document: Document) => Entity;
  readonly entityName: string;
  readonly axios: AxiosInstance;
}
