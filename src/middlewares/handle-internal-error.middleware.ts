import {
    Request,
    Response
} from 'express';

class HandleInternalError {
    public check(
        err: any,
        _req: Request,
        res: Response,
    ): void | any {
        console.log(err.constructor.name)
        console.log('Error: HandleInternalError', err)

        return res.status(500).send({
            error: "Oops! Error in server",
            socialNetwork: [
                'If you need a FullStack Developer for your projects, contact me by linkedin',
                'https://www.linkedin.com/in/jose-sleiter-rios/',
                'https://github.com/JoseSleiter/'
            ]
        });
    }
}

export { HandleInternalError };