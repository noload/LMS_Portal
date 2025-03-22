import bookRepository from "../repositories/bookRepository.js";
import AppError from "../utils/errorHandler.js";
import borrowedBookRepository from "../repositories/borrowBookRepository.js";
import userRepository from "../repositories/userRepository.js";
class BorrowedBookService {
  async borrowBook(userId, bookId) {
    try {
      const user = await userRepository.findById(userId);
      console.log(user);
      if (!user || !user.isApproved) {
        throw new AppError("User not approved");
      }
      const book = await bookRepository.findById(bookId);
      if (!book) throw new AppError("Book not found", 404);
      if (book.availableCopies <= 0)
        throw new AppError("No available copies", 400);

      await bookRepository.update(bookId, {
        availableCopies: book.availableCopies - 1,
      });

      return await borrowedBookRepository.create({ userId, bookId });
    } catch (error) {
      console.error("Error in borrowBook:", error.message);
      throw new AppError(error.message || "Failed to borrow book", 500);
    }
  }

  async returnBook(borrowId) {
    try {
      const borrowedBook = await borrowedBookRepository.findById(borrowId);
      if (!borrowedBook || borrowedBook.status === "returned")
        throw new AppError("Invalid return request", 400);

      await borrowedBookRepository.update(borrowId, {
        status: "returned",
        returnedAt: new Date(),
      });

      const book = await bookRepository.findById(borrowedBook.bookId);
      await bookRepository.update(book.id, {
        availableCopies: book.availableCopies + 1,
      });
      const borrowBook = await borrowedBookRepository.findById(borrowId);

      return borrowBook;
    } catch (error) {
      console.error("Error in returnBook:", error.message);
      throw new AppError(error.message, 500);
    }
  }

  async getUserBorrowHistory(userId) {
    try {
      const user = await userRepository.findById(userId);

      if (!user) {
        throw new AppError("User not exist", 400);
      }
      return await borrowedBookRepository.getUserBorrows(userId);
    } catch (error) {
      console.error("Error in getUserBorrowHistory:", error.message);
      throw new AppError("Failed to fetch borrow history", 500);
    }
  }

  async getAllBorrows(page = 1, limit = 10, filters = {}) {
    try {
      const offset = (page - 1) * limit;
      const { rows: borrows, count: totalItems } =
        await borrowedBookRepository.getAllBorrowingHistory({
          limit,
          offset,
          filters,
        });
      return {
        data: borrows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          limit,
        },
      };
    } catch (error) {
      console.error("Error in getAllBorrows:", error.message);
      throw new AppError("Failed to fetch borrow records", 500);
    }
  }
}

export default new BorrowedBookService();
