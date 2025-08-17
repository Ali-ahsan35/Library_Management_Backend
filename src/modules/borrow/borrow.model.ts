import { Model, model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: [true, 'Book ID is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be positive'] },
    dueDate: { type: Date, required: [true, 'Due date is required'] },
}, { timestamps: true });


// Pre-save Middleware for Business Logic
borrowSchema.pre('save', async function (this: IBorrow, next) {
    const book = await model('Book').findById(this.book);
    if (!book) {
        return next(new Error('Book not found'));
    }
    if (book.copies < this.quantity) {
        return next(new Error('Insufficient copies available'));
    }
    book.copies -= this.quantity;
    book.available = book.copies > 0;
    await book.save();
    next();
});


export const Borrow: Model<IBorrow> = model<IBorrow>('Borrow', borrowSchema);