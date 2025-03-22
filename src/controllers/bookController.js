import bookService from "../services/bookService.js";

class BookController {
  async createBook(req, res, next) {
    try {
      const book = await bookService.createBook(req.body);
      return res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllBooks(req, res, next) {
    try {
      const { page = 1, limit = 10, category, author } = req.query;
      const filters = {};
      if (category) filters.category = category;
      if (author) filters.author = author;

      const response = await bookService.getAllBooks(page, limit, filters);
      return res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id);
      return res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      const { id } = req.params;
      const book = await bookService.updateBook(id, req.body);
      return res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      await bookService.deleteBook(id);
      return res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
