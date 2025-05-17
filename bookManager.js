import chalk from 'chalk';
import express from 'express';
import fs from 'fs';
import { statusCode } from './errors.js';

const app = express();
app.use(express.json());

class Book {
    constructor(title, author, publishedDate, isbn, location, shelfLocation) {
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
        this.location = location;
        this.shelfLocation = shelfLocation;
    }

    static checkIfBookExists(data, type = 'ISBN') {
        if (type === 'title') {
            return books.some(book => book.title === data);
        } else if (type === 'ISBN') {
            return books.some(book => book.isbn === data);
        }
    }

    add(book) {
        this.books.push(book);
        statusCode(201);
        console.log(`${chalk.green(book.title)} added to the library`);
        Book.pushBooksToJSON();
    }

    remove(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
        statusCode(200);
        console.log(`${chalk.red.strikethrough(book.title)} removed from the library`);
        Book.pushBooksToJSON();
    }

    static getBooksFromJSON() {
        const data = fs.readFileSync('books.json', 'utf-8');
        const rawBooks = JSON.parse(data);
        return rawBooks.map(b => new Book(b.title, b.author, b.publishedDate, b.isbn, b.location, b.shelfLocation));
    }

    static pushBooksToJSON() {
        fs.writeFileSync('books.json', JSON.stringify(books, null, 2), 'utf-8');
    }

    static issue(isbn) {
        const book = books.find(book => book.isbn === isbn);
        if (book) {
            book.location = 'On Loan';
            Book.pushBooksToJSON();
            statusCode(200);
            console.log(`${chalk.green(book.title)} has been issued`);
        } else {
            statusCode(417);
        }
    }

    static return(isbn) {
        const book = books.find(book => book.isbn === isbn);
        if (book) {
            book.location = book.shelfLocation;
            Book.pushBooksToJSON();
            statusCode(200);
            console.log(`${chalk.green(book.title)} has been returned.`)
        } else {
            statusCode(417);
        }
    }
}

// Deprecated: use Book.getBooksFromJSON instead
function getBooksFromJSON() {
    return Book.getBooksFromJSON();
}

// Ensure books is an array of Book instances
let books = getBooksFromJSON();

export { Book, books };