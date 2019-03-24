import {Response} from 'express';

export const HttpResponse = {
    throwError: (func: Function, text: string): never => {
        throw func(text);
    },
    ok: (res: Response, data: any): void => {
        res.json({data});
    },
    error: (res: Response, status: number, error: any): void => {
        res.status(status).json({error});
    }
};
