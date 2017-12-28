import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import catchErrors from './catchErrors';
import FacadeConfig from './FacadeConfig';

export default (config: FacadeConfig) => {
  return catchErrors(async (req: Request, res: Response) => {
    const { count } = await config.repo.countEntities({
      filter: JSON.parse(req.query.filter),
    });
    res.status(OK).json(count);
  });
};
