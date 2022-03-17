import { RequestHandler } from "express";
import bookModel from "../../models/book";
import { getErrorMessage, bookValidation } from "../../utils";

export const createBook: RequestHandler = async (req, res) => {
  try {
    const { title, author, price } = req.body as {
      title: string;
      author: string;
      price: number;
    };

    const isValid = bookValidation({ title, author, price });

    if (!isValid.success) {
      return res.status(422).json({
        success: false,
        data: null,
        message: isValid.message,
      });
    }

    const book = new bookModel({
      title,
      author,
      price,
    });
    await book.save();
    return res.status(201).json({
      success: true,
      data: book,
      message: "Book added successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: getErrorMessage(err),
    });
  }
};

export const listBook: RequestHandler = async (req, res) => {
  try {
    const books = await bookModel.find({});
    return res.status(200).json({
      success: true,
      data: books,
      message: "Books listed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: getErrorMessage(err),
    });
  }
};

export const updateBook: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const bookId = req.params.id;

    const { title, author, price } = req.body as {
      title: string;
      author: string;
      price: number;
    };

    const isValid = bookValidation({ title, author, price });

    if (!isValid.success) {
      return res.status(422).json({
        success: false,
        data: null,
        message: isValid.message,
      });
    }

    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { title, author, price },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      data: updatedBook,
      message: "Book updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: getErrorMessage(err),
    });
  }
};

export const deleteBook: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const bookId = req.params.id;

    await bookModel.findOneAndDelete({ _id: bookId });

    return res.status(201).json({
      success: true,
      data: null,
      message: "Book deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      message: getErrorMessage(err),
    });
  }
};
