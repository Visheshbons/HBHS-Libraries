import chalk from 'chalk';
import express from 'express';
import fs from 'fs';
import { statusCode } from './errors.js';

const app = express();
app.use(express.json());

class User {
    constructor(name, email, id = null, books = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.books = books || [];
    }

    static checkIfUserExists(data, type = 'ID') {
        if (type === 'name') {
            return users.some(user => user.name === data);
        } else if (type === 'ID') {
            return users.some(user => user.id === data);
        }
    }

    addBook(book) {
        this.books.push(book);
        statusCode(202);
        console.log(`${chalk.grey(this.name)} borrowed ${chalk.green(book.title)}`);
        User.pushUsersToJSON();
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
        statusCode(200);
        console.log(`${chalk.grey(this.name)} returned ${chalk.green(book.title)}`);
        User.pushUsersToJSON();
    }

    static getUsersFromJSON() {
        const data = fs.readFileSync('users.json', 'utf-8');
        return JSON.parse(data);
    }

    static pushUsersToJSON() {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
    }
}

function getUsersFromJSON() {
    const data = fs.readFileSync('users.json', 'utf-8');
    const rawUsers = JSON.parse(data);
    return rawUsers.map(u => new User(u.name, u.email, u.id, u.books));
}

const users = getUsersFromJSON();

export { User, users };