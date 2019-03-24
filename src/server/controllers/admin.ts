import express, {Request, Response} from 'express';

import {HttpResponse} from 'server/utils/http';
import {asyncMiddlewareWrapper, checkGetLimitParameters} from 'server/utils';

import SomeService from 'server/services/some';

const controller = express();

// TODO on each request check special auth

controller.get('/smth', asyncMiddlewareWrapper(async (req: Request, res: Response) => {
    const limitParameters = await checkGetLimitParameters(req.query);

    const result = await SomeService.doSmth(limitParameters);
    HttpResponse.ok(res, result);
}));

export default controller;
