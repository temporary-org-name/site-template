import {Request, Response, NextFunction} from 'express';
import Boom from 'boom';

export const asyncMiddlewareWrapper = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (!err.isBoom) {
            return next(Boom.badImplementation(err));
        }
        next(err);
    });
};
