import chalk from 'chalk';
import express from 'express';
import fs from 'fs';
import { statusCode } from './errors.js';

const app = express();
app.use(express.json());

class Book {
    constructor(name, email) {
        this.id = users.length + 1;
        this.name = name;
        this.email = email;
        this.books = [];
    }

    add(book) {
        this.books.push(book);
        statusCode(201);
        console.log(`${chalk.green(book.title)} added to the library`);
        pushBooksFromJSON();
    }

    remove(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
        statusCode(200);
        console.log(`${chalk.red.strikethrough(book.title)} removed from the library`);
        pushBooksFromJSON();
    }

    static getBooksFromJSON() {
        const data = fs.readFileSync('books.json', 'utf-8');
        return JSON.parse(data);
    }

    static pushBooksFromJSON() {
        fs.writeFileSync('books.json', JSON.stringify(books, null, 2), 'utf-8');
    }
}

const books = Book.getBooksFromJSON();

export { Book, books };