import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import { Request, Response } from 'express';
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';

export type Handler = (req: Request, res: Response) => Promise<void>;

export default (handler: Handler) => {
  return (req: Request, res: Response) => {
    handler(req, res).catch((err) => {
      if (err instanceof ConflictingEntityError) {
        return res.status(CONFLICT).send();
      }
      if (err instanceof MissingEntityError) {
        return res.status(NOT_FOUND).send();
      }
      /* istanbul ignore next */
      return res.status(INTERNAL_SERVER_ERROR).send();
    });
  };
};
