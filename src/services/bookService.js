import bookRepository from "../repositories/bookRepository.js";
import AppError from "../utils/errorHandler.js";

class BookService {
  async createBook(bookData) {
    try {
      return await bookRepository.create(bookData);
    } catch (error) {
      console.error("Error in createBook:", error.message);
      throw new AppError(error.message || "Failed to add book", 500);
    }
  }

  async getBookById(id) {
    try {
      const book = await bookRepository.findById(id);
      if (!book) throw new AppError("Book not found", 404);
      return book;
    } catch (error) {
      console.error("Error in getBookById:", error.message);
      throw new AppError(error.message || "Failed to fetch book by ID", 500);
    }
  }

  async getAllBooks(page = 1, limit = 10, filters = {}) {
    try {
      page = parseInt(page);
      limit = parseInt(limit);
      const offset = (page - 1) * limit;

      const { rows: books, count: totalItems } = await bookRepository.getAll({
        limit,
        offset,
        filters,
      });

      return {
        data: books,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          limit,
        },
      };
    } catch (error) {
      console.error("Error in getAllBooks:", error.message);
      throw new AppError(error.message || "Failed to fetch books", 500);
    }
  }

  async updateBook(id, updateData) {
    try {
      const book = await bookRepository.findById(id);
      if (!book) throw new AppError("Book not found", 404);

      await bookRepository.update(id, updateData);
      return await bookRepository.findById(id);
    } catch (error) {
      console.error("Error in updateBook:", error.message);
      throw new AppError(error.message || "Failed to update book", 500);
    }
  }

  async deleteBook(id) {
    try {
      const book = await bookRepository.findById(id);
      if (!book) throw new AppError("Book not found", 404);

      return await bookRepository.delete(id);
    } catch (error) {
      console.error("Error in deleteBook:", error.message);
      throw new AppError(error.message || "Failed to delete book", 500);
    }
  }
}

export default new BookService();
