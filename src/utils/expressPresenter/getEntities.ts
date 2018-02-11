import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import catchErrors from './catchErrors';
import FacadeConfig from './FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return catchErrors(async (req: Request, res: Response) => {
    const result = await config.repo.getEntities({
      filter: JSON.parse(req.query.filter),
      pagination: {
        cursor: req.query.cursor,
        forward: req.query.forward === 'true',
        limit: Number(req.query.limit),
      },
      sort: JSON.parse(req.query.sort),
    });
    res.status(OK).json(result);
  });
};
