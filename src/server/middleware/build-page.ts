import {Request, Response} from 'express';

export default (req: Request, res: Response) => {
    const {bundles} = req;

    res.render('index', {
        meta: {
            title: 'Name' // TODO должен браться из БД (админка)
        },
        res: {
            bundles,
            fonts: {}
        },
        global: {
            data: JSON.stringify({})
        }
    });
};
