import express, {Request, Response} from 'express';

import {HttpResponse} from 'server/utils/http';
import {asyncMiddlewareWrapper} from 'server/utils';

const controller = express();

// TODO on neccessary request check user auth

controller.get('/smth', asyncMiddlewareWrapper(async (_req: Request, res: Response) => {
    HttpResponse.ok(res, {});
}));

export default controller;
