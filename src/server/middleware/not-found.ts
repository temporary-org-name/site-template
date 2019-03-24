import {Request, Response, NextFunction} from 'express';
import {notFound} from 'boom';

export default (_req: Request, _: Response, next: NextFunction) => {
    next(notFound('Not Found'));
};
