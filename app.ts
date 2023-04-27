import express from "express";
import blockMonday from "./3-middleware/block-monday";
import catchAll from "./3-middleware/catch-all";
import logRequest from "./3-middleware/log-request";
import routeNotFound from "./3-middleware/route-not-found";
import booksController from "./6-controllers/books-controllers"
import authController from "./6-controllers/auth-controllers"

import expressFileUpload from "express-fileupload"

// Create instance of server
const server = express();

// Bind the json body to the Body
server.use(express.json());

// Bind the Files to the Request 
server.use(expressFileUpload())


// Binding our middleware
server.use(logRequest);
// server.use(blockMonday);

// http://localhost:3001/api/books
server.use('/api', booksController);
server.use('/api', authController);

server.use('*', routeNotFound);

// Binding the Catch all Middleware
server.use(catchAll);

server.listen(3001, () => console.log('Listining to http://localhost:3001'))

