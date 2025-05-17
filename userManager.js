import chalk from 'chalk';
import express from 'express';
import fs from 'fs';
import { statusCode } from './errors.js';

const app = express();
app.use(express.json());

class User {
    constructor(name, email) {
        this.id = users.length + 1;
        this.name = name;
        this.email = email;
        this.books = [];
    }

    static addBook(book) {
        this.books.push(book);
        statusCode(202);
        console.log(`${chalk.grey(this.name)} borrowed ${chalk.green(book.title)}`);
        User.pushUsersFromJSON();
    }

    static removeBook(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
        statusCode(200);
        console.log(`${chalk.grey(this.name)} returned ${chalk.green(book.title)}`);
        User.pushUsersFromJSON();
    }

    static getUsersFromJSON() {
        const data = fs.readFileSync('users.json', 'utf-8');
        return JSON.parse(data);
    }

    static pushUsersFromJSON() {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
    }
}

const users = User.getUsersFromJSON();

export { User, users };