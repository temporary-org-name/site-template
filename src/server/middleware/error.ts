import {Request, Response, NextFunction} from 'express';
import Boom from 'boom';

import {HttpResponse} from 'server/utils/http';
import logger from 'server/lib/logger';

const sendError = (res: Response, err: Boom): void => {
    HttpResponse.error(res, err.output.statusCode, err.output.payload);
};

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err.isBoom) {
        sendError(res, err);
    } else {
        logger('error', 'app', JSON.stringify({err: {stack: err.stack, message: err.message}}));
        sendError(res, Boom.internal());
    }
};
