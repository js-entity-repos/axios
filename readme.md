# axios
> A concrete implementation of js-entity-repos for axios.

### Usage
1. Install it with `npm i @js-entity-repos/axios`.
1. For each entity you will need to do the following.
    1. [Create Id and Entity interfaces](#id-and-entity-interface).
    1. [Create a facade config](#facade-config).
    1. [Construct the facade with the config and interfaces](#calling-the-facade).
    1. [Use the facade](https://github.com/js-entity-repos/core/blob/master/docs/facade.md).

### Id and Entity Interface

```ts
export interface TodoId {
  readonly id: string;
}

export interface TodoEntity extends TodoId {
  readonly description: string;
  readonly completed: boolean;
}
```

### Facade Config

```ts
import FacadeConfig from '@js-entity-repos/axios/dist/Config';
import connectToDb from '@js-entity-repos/axios/dist/utils/connectToDb';
import axios from 'axios';

const todoFacadeConfig: FacadeConfig = {
  axios: axios.create({
    baseURL: `http://localhost:80/api/todos`,
  }),
  constructDocument: (id, patch) => {
    // Converts an entity to a document for the database.
    return { ...patch, ...id }
  },
  constructEntity: (document) => {
    // Converts a document from the database to an entity.
    return document;
  },
  entityName: 'todo',
};
```

The tests in this package contain a [demonstration of how to implement an Express router for the functions in this facade](./src/utils/express).

### Construct the Facade

```ts
import facade from '@js-entity-repos/axios/dist/facade';

const todosFacade = facade<TodoId, TodoEntity>(todoFacadeConfig);
```
