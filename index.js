import express from 'express';
import chalk from 'chalk';
import { statusCode } from './appConfig.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    statusCode(req, res, 501);
});

app.use((req, res, next) => {
    statusCode(req, res, 404);
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${chalk.green(port)}.`);
});