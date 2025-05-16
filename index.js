import express from 'express';
import chalk from 'chalk';
import { statusCode } from './appConfig.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    statusCode(req, res, 200);
    res.render('index.ejs', {
        books: [
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                publishedDate: '1925',
                isbn: '9780743273565',
            },
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                publishedDate: '1960',
                isbn: '9780061120084',
            },
            {
                title: '1984',
                author: 'George Orwell',
                publishedDate: '1949',
                isbn: '9780451524935',
            },
            {
                title: 'Pride and Prejudice',
                author: 'Jane Austen',
                publishedDate: '1813',
                isbn: '9780141439518',
            },
            {
                title: 'FT: The Full Story',
                author: 'Vishesh Kudva',
                publishedDate: '2035',
                isbn: '9780000000000',
            },
        ],
    });
});

app.get('/books', (req, res) => {
    statusCode(req, res, 501);
});

app.get('/bookDev', (req, res) => {
    res.render('bookDev.ejs', {
        books: [
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                publishedDate: '1925',
                isbn: '9780743273565',
            }
        ]
    });
});

app.get('/issue', (req, res) => {
    statusCode(req, res, 501);
});

app.get('/issueDev', (req, res) => {
    res.send('Issue page is under development.');
});

app.get('/return', (req, res) => {
    statusCode(req, res, 501);
});

app.get('/returnDev', (req, res) => {
    res.send('Return page is under development.');
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