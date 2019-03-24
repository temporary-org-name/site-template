import {
    getSome as getSomeQuery
} from 'server/query-creators/some';
import {query} from 'server/lib/db-client';
import {prepareDBResult, IGetLimit} from 'server/services/base';

export default class SomeService {
    static async doSmth(limitParams: IGetLimit): Promise<any[]> {
        const result = await query({
            text: getSomeQuery(limitParams.order),
            values: [limitParams.limit, limitParams.skip]
        });
        return prepareDBResult(result);
    }
}
