import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';


export const errorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            error: err,
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};
