import express from 'express';
import mustacheExpress from 'mustache-express';

import notFoundMiddleware from 'server/middleware/not-found';
import errorMiddleware from 'server/middleware/error';
import buildPageMiddleware from 'server/middleware/build-page';
import mappingUrlMiddleware from 'server/middleware/mapping-urls';

import adminController from 'server/controllers/admin';
import clientController from 'server/controllers/client';
import {getAbsolutePath} from 'server/utils/fs';
import logger from 'server/lib/logger';

import {clientUrls} from 'common/urls';

const PORT = process.env.NODEJS_PORT || '8080';

const app = express()
    .get('/ping', (_, res) => res.end())
    .engine('mustache', mustacheExpress())
    .set('view engine', 'mustache')
    .set('views', getAbsolutePath('./src/client/page-templates'));

// TODO create only for development, better use docker compose
// but I have a question how it create with database
// Plan:
// I can create special Dockerfile.dev and run with it
// In this container will be database and others
// !!! Its neccessary for using production image with nginx and supervisor
app
    .use('/client', express.static('build/client'))
    .use('/res', express.static('build/resources'));

app
    .use('/admin-api', adminController)
    .use('/client-api', clientController);

app.get([
    ...Object.values<string>(clientUrls.admin),
    ...Object.values<string>(clientUrls.client)
], [mappingUrlMiddleware, buildPageMiddleware])

app
    .use(notFoundMiddleware)
    .use(errorMiddleware);

const server = app.listen(PORT, () => {
    logger('info', 'app', `Server listen ${PORT} port`)
});

module.exports = server;