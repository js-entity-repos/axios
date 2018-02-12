import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import catchErrors from './catchErrors';
import FacadeConfig from './FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return catchErrors(async (req: Request, res: Response) => {
    const { entity } = await config.repo.replaceEntity({
      entity: req.body,
      filter: JSON.parse(req.query.filter),
      id: req.params.id,
    });
    res.status(OK).json(entity);
  });
};
