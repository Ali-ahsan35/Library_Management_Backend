import {  model, Schema } from "mongoose";
import { IBook } from "./book.interface";


const bookSchema = new Schema<IBook>({
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: String, required: [true, 'Author is required'] },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        message: 'Invalid genre',
    },
    isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
    description: { type: String },
    copies: { type: Number, required: [true, 'Copies is required'], min: 0 },
    available: { type: Boolean, default: true },
}, { timestamps: true });



// Instance Method
bookSchema.methods.checkAvailability = function (this: IBook): boolean {
    return this.copies > 0;
};


// Pre-save Middleware
bookSchema.pre('save', function (this: IBook, next) {
    this.available = this.copies > 0;
    next();
});


export const Book = model<IBook>('Book', bookSchema);