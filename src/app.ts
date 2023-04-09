// Venders
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from "helmet";
import mongoose from 'mongoose';
import morgan from "morgan";

// Routes && Middlewares
import { HandleErrors } from './middlewares/handle-errors.middleware';
import { HandleInternalError } from './middlewares/handle-internal-error.middleware';
import { HandleNotFoundPath } from './middlewares/handle-not-found-path.middleware';
import noteRoute from './routes/v1/note.routes';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;
const URL_MONGODB = process.env.MONGO_URI || 'mongodb://localhost:27017/local';

// Beging Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

// Routes Public
app.get('/doc-public', (_req, res) => {
    res.send('You are Logged out');
});

// Routes Private
app.use('/api/v1', noteRoute)

// Ending Middlewares
const handleNotFoundPath = new HandleNotFoundPath()
const handleErrors = new HandleErrors()
const handleInternalError = new HandleInternalError()
app.use("*", handleNotFoundPath.check);
app.use(handleErrors.check);
app.use(handleInternalError.check);

// Start the DB
mongoose.connect(`${URL_MONGODB}`, {
    autoIndex: true,
    autoCreate: true
})

// Start the server
app.listen(PORT, () => {
    console.log(`⚡️[Server] is listening on port http://localhost:${PORT}`);
});