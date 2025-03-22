import Book from "../models/Book.js";
import BorrowedBook from "../models/BorrowedBook.js";

class BorrowedBookRepository {
  async create(borrowData) {
    return await BorrowedBook.create(borrowData);
  }

  async findById(id) {
    return await BorrowedBook.findByPk(id);
  }

  async findActiveBorrow(userId, bookId) {
    return await BorrowedBook.findOne({
      where: { userId, bookId, returnDate: null },
    });
  }

  async update(id, updateData) {
    await BorrowedBook.update(updateData, { where: { id } });
    return await BorrowedBook.findByPk(id);
  }

  async getAllBorrowingHistory() {
    return await BorrowedBook.findAll({
      include: ["User", "Book"],
      order: [["borrowDate", "DESC"]],
    });
  }

  async getUserBorrows(userId) {
    return await BorrowedBook.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          as: "book",
          attributes: ["id", "title", "author"],
        },
      ],
      order: [["borrowedAt", "DESC"]],
    });
  }
}

export default new BorrowedBookRepository();
