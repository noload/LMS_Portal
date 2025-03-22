import borrowedBookService from "../services/borrowedBookService.js";

class BorrowedBookController {
  async borrowBook(req, res, next) {
    try {
      const { bookId } = req.body;
      const userId = req.user.id;

      const borrowedBook = await borrowedBookService.borrowBook(userId, bookId);
      return res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowedBook,
      });
    } catch (error) {
      next(error);
    }
  }

  async returnBook(req, res, next) {
    try {
      const { id } = req.params;

      const returnedBook = await borrowedBookService.returnBook(id);
      return res.status(200).json({
        success: true,
        message: "Book returned successfully",
        data: returnedBook,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserBorrowHistory(req, res, next) {
    try {
      const userId = req.user.id;

      const borrowHistory = await borrowedBookService.getUserBorrowHistory(
        userId
      );
      return res.status(200).json({
        success: true,
        message: "Borrow history fetched successfully",
        data: borrowHistory,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllBorrows(req, res, next) {
    try {
      const { page = 1, limit = 10, status, userId } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (userId) filters.userId = userId;

      const response = await borrowedBookService.getAllBorrows(
        page,
        limit,
        filters
      );
      return res.status(200).json({
        success: true,
        message: "Borrow records fetched successfully",
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BorrowedBookController();
