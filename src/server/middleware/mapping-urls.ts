import {Response, Request, NextFunction} from 'express';

import env from 'server/lib/env';
import {clientUrls} from 'common/urls';

const isProd = env === 'production';

enum Format {
    JS = 'js',
    CSS = 'css'
}

const urls = new Map([
    ...Object.values(clientUrls.client).map((url) => ([url, 'client'] as [string, string])), // tslint:disable-line
    ...Object.values(clientUrls.admin).map((url) => ([url, 'admin'] as [string, string])) // tslint:disable-line
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
