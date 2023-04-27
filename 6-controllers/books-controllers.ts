import express, { NextFunction, Request, Response } from "express";
import deleteMessage from "../3-middleware/delete-message";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import BookModel from "../4-models/book-model";
import booksLogic from "../5-logic/books-logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/books
router.get('/books', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = await booksLogic.getAllBooks();
        response.json(books);
    } catch (error) {
        next(error)
    }
});

// // GET http://localhost:3001/api/books/1
// router.get('/books/:id', async (request: Request, response: Response, next: NextFunction) => {
//     const id = +request.params.id;
//     if (id === 70) {
//         next({ message: "Can't get id 70!!!", status: 400 });
//         return;
//     }
//     const book = await booksLogic.getOneBook(id);
//     response.json(book);
// });

// GET http://localhost:3001/api/books/1
router.get('/books/:id([0-9]+)', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const book = await booksLogic.getOneBook(id);
        response.json(book);
    } catch (error) {
        next(error)
    }
});

// POST http://localhost:3001/api/books/
router.post('/books', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Take the image from Files and append it to thh body
        request.body.image = request.files?.image;

        const book = new BookModel(request.body);
        const newBook = await booksLogic.addBook(book);
        response.status(201).json(newBook)
    } catch (error) {
        next(error)
    }
});

// PUT http://localhost:3001/api/books/1
router.put('/books/:id([0-9]+)', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Take the image from Files and append it to thh body
        request.body.image = request.files?.image;

        const id = +request.params.id;
        request.body.id = id;
        const book = new BookModel(request.body);
        const updatedBook = await booksLogic.updateBook(book)
        response.json(updatedBook)
    } catch (error) {
        next(error)
    }
});

// PATCH http://localhost:3001/api/books/1
router.patch('/books/:id([0-9]+)', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        const book = new BookModel(request.body);
        const updatedBook = await booksLogic.patchBook(book)
        response.json(updatedBook)
    } catch (error) {
        next(error)
    }
});

// router.delete('/books/:id', [deleteMessage], async (request: Request, response: Response, next: NextFunction) => {
router.delete('/books/:id([0-9]+)', [deleteMessage, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await booksLogic.deleteBook(id);
        response.sendStatus(204);
    } catch (error) {
        next(error)
    }
})

export default router;