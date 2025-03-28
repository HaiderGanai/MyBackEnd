const express = require('express');
const { createBook, getBooks,getBookByID,  updateBook, deleteBook, uploadBookFile } = require('../controllers/bookController');
const { authenticateJWT } = require('../middlewares/authenticateJWT');
const { checkAuthorRole } = require('../middlewares/checkAuthorRole');
const { Books } = require('../models/booksModel');
const { BookFiles } = require('../models/bookFilesModel');
const upload = require("../middlewares/multerMiddleware");
const multer = require('multer');


const booksRouter = express.Router();

//Get all books
booksRouter.get('/books', getBooks);
booksRouter.get('/books/:id',authenticateJWT, getBookByID);



//Create a new book
booksRouter.post('/createbooks',authenticateJWT,checkAuthorRole, createBook);
//update a book
booksRouter.put('/books/:id',authenticateJWT,checkAuthorRole, updateBook);
//delete a book
booksRouter.delete('/books/:id',authenticateJWT,checkAuthorRole, deleteBook);


// upload a bookFile
booksRouter.post('/upload/:bookId',authenticateJWT,checkAuthorRole, upload.single("file"), uploadBookFile);
    


module.exports = { booksRouter };