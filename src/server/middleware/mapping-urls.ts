import {Response, Request, NextFunction} from 'express';

import env from 'server/lib/env';

const isProd = env === 'production';

enum Format {
    JS = 'js',
    CSS = 'css'
}

const urls = new Map([
    ['/admin-panel', 'admin'],
    ['/', 'client']
]);

export default (req: Request, _: Response, next: NextFunction): void => {
    const pageName = urls.get(req.path) || '/';

    req.bundles = {
        styles: formPath(pageName, Format.CSS),
        scripts: formPath(pageName, Format.JS)
    };

    next();
};

const formPath = (name: string, format: Format): string => {
    return `/client/${name}.bundle.${isProd ? 'min.' : ''}${format}`;
};
