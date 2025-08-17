import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from './book.controller';


const bookRoute = express.Router();


bookRoute.post('/', createBook);
bookRoute.get('/', getAllBooks);
bookRoute.get('/:bookId', getBookById);
bookRoute.patch('/:bookId', updateBook);
bookRoute.delete('/:bookId', deleteBook);


export default bookRoute;