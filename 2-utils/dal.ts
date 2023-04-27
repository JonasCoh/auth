import fsPromises from "fs/promises"
import BookModel from "../4-models/book-model";
import UserModel from "../4-models/user-model";

const booksFile = "./src/1-assets/json/books.json"
const usersFile = "./src/1-assets/json/users.json"

// Books DAL
async function getAllBooks(): Promise<BookModel[]> {
    const content = await fsPromises.readFile(booksFile, "utf-8");
    const books = JSON.parse(content)
    return books;
}

async function saveAllBooks(books: BookModel[]): Promise<void> {
    const content = JSON.stringify(books, null, 4);
    await fsPromises.writeFile(booksFile, content);
}




// Users DAL
async function getAllUsers(): Promise<UserModel[]> {
    const content = await fsPromises.readFile(usersFile, "utf-8");
    const users = JSON.parse(content)
    return users;
}

async function saveAllUsers(users: UserModel[]): Promise<void> {
    const content = JSON.stringify(users, null, 4);
    await fsPromises.writeFile(usersFile, content);
}




export default {
    getAllBooks,
    saveAllBooks,
    getAllUsers,
    saveAllUsers
}