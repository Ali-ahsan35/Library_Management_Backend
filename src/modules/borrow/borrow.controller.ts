import { Request, Response, NextFunction } from 'express';
import { Borrow } from './borrow.model';



export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book, quantity, dueDate } = req.body;
        const borrow = new Borrow({ book, quantity, dueDate });
        await borrow.save();
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    } catch (error) {
        next(error);
    }
};


export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await Borrow.aggregate([
            { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo',
                },
            },
            { $unwind: '$bookInfo' },
            {
                $project: {
                    _id: 0,
                    book: { title: '$bookInfo.title', isbn: '$bookInfo.isbn' },
                    totalQuantity: 1,
                },
            },
        ]);
        res.json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    } catch (error) {
        next(error);
    }
};
