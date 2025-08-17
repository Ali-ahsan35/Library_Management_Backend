import { Request, Response, NextFunction } from 'express';
import { Book } from './book.model';


export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    } catch (error) {
        next(error);
    }
};


export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query: any = filter ? { genre: filter } : {};
        const books = await Book.find(query)
            .sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    } catch (error) {
        next(error);
    }
};


export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
            return;
        }
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    } catch (error) {
        next(error);
    }
};


export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
            return;
        }
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    } catch (error) {
        next(error);
    }
};


export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: 'Not found',
            });
            return;
        }
        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

// export const bookController = {
//     createBook,
//     getAllBooks,
//     getBookById,
//     updateBook,
//     deleteBook,
// };
