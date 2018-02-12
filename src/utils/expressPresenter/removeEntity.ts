import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import catchErrors from './catchErrors';
import FacadeConfig from './FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return catchErrors(async (req: Request, res: Response) => {
    await config.repo.removeEntity({
      filter: JSON.parse(req.query.filter),
      id: req.params.id,
    });
    res.status(NO_CONTENT).send();
  });
};
