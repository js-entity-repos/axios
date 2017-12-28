import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import catchErrors from './catchErrors';
import FacadeConfig from './FacadeConfig';

export default (config: FacadeConfig) => {
  return catchErrors(async (req: Request, res: Response) => {
    const { entity } = await config.repo.overwriteEntity({
      entity: req.body,
      id: { id: req.body.id },
    });
    res.status(OK).json(entity);
  });
};
