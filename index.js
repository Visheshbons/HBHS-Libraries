import express from 'express';
import chalk from 'chalk';
import { statusCode } from './errors.js';
import { User, users } from './userManager.js';
import { Book, books } from './bookManager.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    statusCode(req, res, 200);
    res.render('index.ejs', {
        books: books,
    });
});

app.get('/books', (req, res) => {
    statusCode(req, res, 501);
});

app.get('/bookDev', (req, res) => {
    statusCode(req, res, 200);
    res.render('books.ejs', {
        books: books
    });
});

app.get('/issue', (req, res) => {
    statusCode(req, res, 501);
});

app.get('/issueDev', (req, res) => {
    statusCode(req, res, 200);
    res.render('issue.ejs');
});

app.post('/issue', (req, res) => {
    statusCode(req, res, 501, true);
});

app.get('/return', (req, res) => {
    statusCode(req, res, 501);
});

app.get('/returnDev', (req, res) => {
    statusCode(req, res, 501, true);
});

app.get('/teapot', (req, res) => {
    statusCode(req, res, 418);
});

app.use((req, res, next) => {
    statusCode(req, res, 404);
    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${chalk.green(port)}.`);
});