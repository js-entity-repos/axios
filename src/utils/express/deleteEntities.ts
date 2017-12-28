import { Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import catchErrors from './catchErrors';
import FacadeConfig from './FacadeConfig';

export default (config: FacadeConfig) => {
  return catchErrors(async (req: Request, res: Response) => {
    if (req.query.id !== undefined) {
      await config.repo.removeEntity({
        id: JSON.parse(req.query.id),
      });
      res.status(NO_CONTENT).send();
    } else {
      await config.repo.removeEntities({
        filter: JSON.parse(req.query.filter),
      });
      res.status(NO_CONTENT).send();
    }
  });
};
