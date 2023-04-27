import dal from "../2-utils/dal";
import BookModel from "../4-models/book-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { v4 as uuidv4 } from "uuid";
import path from "path"

import fs from "fs"


// Get all books:
async function getAllBooks(): Promise<BookModel[]> {
    const books = await dal.getAllBooks();
    return books;
}


// Get one book:
async function getOneBook(id: number): Promise<BookModel> {
    const books = await dal.getAllBooks();
    const book = books.find(b => b.id === id);

    if (!book) throw new ResourceNotFoundErrorModel(id);

    return book;
}

// add book:
async function addBook(book: BookModel): Promise<BookModel> {

    // Validation
    const err = book.validation()
    if (err) throw new ValidationErrorModel(err);

    if (book.image) {

        // Extract ext 01
        // const extArr = book.image.name.split('.');
        // const ext = extArr[extArr.length-1];
        // book.imageName = uuidv4() + "." + ext;

        // Extract ext 02
        // const ext = book.image.name.substring(book.image.name.lastIndexOf('.'));
        // book.imageName = uuidv4() + ext;

        // Extract ext 03
        const ext = path.extname(book.image.name);
        book.imageName = uuidv4() + ext;


        await book.image.mv("./src/1-assets/images/" + book.imageName);
        delete book.image;

    }


    // Get all books
    const books = await dal.getAllBooks();

    // Add ID 
    const max = books.reduce((max, item) => item.id > max ? item.id : max, books[0].id)
    book.id = max + 1;

    // Add to Array of Books
    books.push(book);

    // save all books
    await dal.saveAllBooks(books);

    // return New book
    return book;
}

// Update book 
async function updateBook(book: BookModel): Promise<BookModel> {

    // Valitation
    const err = book.validation()
    if (err) throw new ValidationErrorModel(err);

    // Get all books
    const books = await dal.getAllBooks();

    // Get the index
    const index = books.findIndex(b => b.id === book.id);

    if (index === -1) throw new ResourceNotFoundErrorModel(book.id);

    if (book.image) {

        // Delete file
        if (fs.existsSync("./src/1-assets/images/" + books[index].imageName)) {
            fs.unlinkSync("./src/1-assets/images/" + books[index].imageName)
        }

        // Extract ext 
        const ext = path.extname(book.image.name);
        book.imageName = uuidv4() + ext;
        await book.image.mv("./src/1-assets/images/" + book.imageName);
        delete book.image;
    }

    // update the book in the array
    books[index] = book;

    // save all books
    await dal.saveAllBooks(books);

    // return New book
    return book;
}

// Update book 
async function patchBook(book: BookModel): Promise<BookModel> {

    // // Valitation
    // const err = book.validation()
    // if (err) throw new ValidationErrorModel(err);

    // Get all books
    const books = await dal.getAllBooks();

    // Get the index
    const index = books.findIndex(b => b.id === book.id);

    if (index === -1) throw new ResourceNotFoundErrorModel(book.id);

    // update the book in the array
    const newBook = new BookModel(books[index])

    for (const key in book) {
        if (book[key]) {
            newBook[key] = book[key]
        }
    }

    books[index] = newBook;

    // save all books
    await dal.saveAllBooks(books);

    // return New book
    return books[index];
}





// Delete one book
async function deleteBook(id: number) {

    // Get all books
    const books = await dal.getAllBooks();

    // Get the index
    const index = books.findIndex(b => b.id === id);
    if (index === -1) throw new ResourceNotFoundErrorModel(id);

    // Delete file
    if (fs.existsSync("./src/1-assets/images/" + books[index].imageName)) {
        fs.unlinkSync("./src/1-assets/images/" + books[index].imageName)
    }

    // Delete 
    books.splice(index, 1);

    // save all books
    await dal.saveAllBooks(books);
}


export default {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook,
    deleteBook,
    patchBook
}