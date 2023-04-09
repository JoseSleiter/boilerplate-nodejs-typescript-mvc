import {
    Request,
    Response,
    NextFunction
} from 'express';

export function asyncMiddleware(fn: any) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        Promise.resolve(
            fn(req, res)
        ).catch(next);
    }
};