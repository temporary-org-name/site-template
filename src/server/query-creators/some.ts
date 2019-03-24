import {OrderType} from 'server/query-creators/base';

export const getSome = (order: OrderType) => {
    return `
        SELECT * FROM something
        ORDER BY smth ${order}
        LIMIT $1 OFFSET $2
    `;
};
