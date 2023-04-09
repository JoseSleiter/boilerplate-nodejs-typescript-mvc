import {
    Request,
    Response,
    NextFunction
} from 'express';

class HandleErrors {
    public check(
        err: any,
        _req: Request,
        res: Response,
        next: NextFunction
    ): void | any {
        console.log(err.constructor.name)
        console.log('Error: HandleErrors', err)

        if (err.error === 'access_denied') {
            return res.redirect('/');
        }

        if (err.name === 'CastError') {
            res.status(400).json({ message: `Invalid value to param id: ${err.value}` });
        }

        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        }

        if (err instanceof TypeError) {
            return res.status(500).send({
                error: "Oops! Error in server code",
                socialNetwork: [
                    'If you need a FullStack Developer for your projects, contact me by linkedin',
                    'https://www.linkedin.com/in/jose-sleiter-rios/',
                    'https://github.com/JoseSleiter/'
                ]
            });
        }
        next(err);
    }
}

export { HandleErrors };