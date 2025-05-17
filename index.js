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
    statusCode(req, res, 202);
    const { userId, bookId } = req.body;

    // Identify user
    let user = users.find(user => user.id === parseInt(userId));
    if (user == null) {
        user = users.find(user => user.name === userId);
    };
    if (user == null) {
        statusCode(req, res, 412);
        return;
    };

    // Identify book
    let book = books.find(book => book.isbn === bookId);
    if (book == null) {
        book = books.find(book => book.title === bookId);
    };
    if (book == null) {
        statusCode(req, res, 412);
        return;
    };

    // Add book to user
    user.addBook(book);
    Book.issue(book.isbn);

    statusCode(req, res, 200);
    res.redirect("/")
});

app.get('/return', (req, res) => {
    statusCode(req, res, 501);
});

app.get('/returnDev', (req, res) => {
    statusCode(req, res, 200);
    res.render('return.ejs')
});

app.post('/return', (req, res) => {
    statusCode(req, res, 202);
    const { bookId } = req.body;

    // Identify Book
    let book = books.find(book => book.isbn === bookId);
    if (book == null) {
        book = books.find(book => book.title === bookId);
    };
    if (book == null) {
        statusCode(req, res, 412);
        return;
    };

    // Identify Owner of Book
    let owner = users.find(user => user.books && user.books.some(b => b.isbn === book.isbn));
    if (!owner) {
        statusCode(req, res, 412);
        return;
    }

    // Remove book from Owner's "books[]" array
    owner.books = owner.books.filter(b => b.isbn !== book.isbn);
    Book.return(book.isbn);
    statusCode(req, res, 200);
    res.redirect("/");
})

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