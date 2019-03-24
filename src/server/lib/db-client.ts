import pg from 'pg';
import fs from 'fs';
import Boom from 'boom';

import logger from 'server/lib/logger';
import {getAbsolutePath} from 'server/utils/fs';
import {HttpResponse} from 'server/utils/http';

interface IQuery {
    text: string;
    values: any[];
}

const dbErrorHandler = (err: Error, _client: pg.PoolClient) => {
    logger('error', 'db', err.stack || '');
};

const jsonDbConfig = fs.readFileSync(getAbsolutePath(`./configs/db/db.json`), 'utf8');
const dbConfig = JSON.parse(jsonDbConfig);
const {Pool} = pg;

const config = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    idleTimeoutMillis: 1000 * 60 * 2,
    connectionTimeoutMillis: 2000
};

const pool = new Pool(config);
pool.on('error', dbErrorHandler);

export const query = async (queryData: IQuery): Promise<any[]> => {
    let client;
    let data;

    try {
        client = await pool.connect();
        data = await client.query(queryData);
    } catch (e) {
        logger('error', 'db', e.message);
        HttpResponse.throwError(Boom.conflict, `${e.detail} ${e.message}`);
    } finally {
        if (client) {
            client.release();
        }
    }
    return data && data.rows || [];
};

export const forceCloseConnection = async () => {
    pool.end();
};
