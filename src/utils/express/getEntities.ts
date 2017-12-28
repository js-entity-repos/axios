import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import catchErrors from './catchErrors';
import FacadeConfig from './FacadeConfig';

export default (config: FacadeConfig) => {
  return catchErrors(async (req: Request, res: Response) => {
    if (req.query.id !== undefined) {
      const { entity } = await config.repo.getEntity({
        id: JSON.parse(req.query.id),
      });
      res.status(OK).json(entity);
    } else {
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
    }
  });
};
