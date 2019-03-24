import {Request, Response, NextFunction} from 'express';
import Boom from 'boom';
import Joi from 'joi';

import {IGetLimit} from 'server/services/base';
import {OrderType, ORDER_TYPES} from 'server/query-creators/base';
import {HttpResponse} from 'server/utils/http';

export const asyncMiddlewareWrapper = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (!err.isBoom) {
            return next(Boom.badImplementation(err));
        }
        next(err);
    });
};

export const checkGetLimitParameters = async (data: any): Promise<IGetLimit> => {
    const {limit, skip, order} = data;
    const validateData = {limit, skip, order: order || OrderType.ASC};
    const schema = {
        limit: Joi.number().required(),
        skip: Joi.number().required(),
        order: Joi.string().valid(ORDER_TYPES).required()
    };

    try {
        await Joi.validate(validateData, schema); // tslint:disable-line
    } catch (e) {
        HttpResponse.throwError(Boom.badRequest, joiValidationErrorToString(e));
    }

    return validateData;
};

export const joiValidationErrorToString = (error: Joi.ValidationError): string => {
    return error.details.map((d: any) => d.message).join(', ');
};
