import Book from "../models/Book.js";
import BorrowedBook from "../models/BorrowedBook.js";
import User from "../models/User.js";

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
    const result = await BorrowedBook.findAndCountAll({
      include: [
        { model: User, as: "user" },
        { model: Book, as: "book" },
      ],
      order: [["borrowedAt", "DESC"]],
      raw: true, // Keeps the query efficient but requires restructuring
    });

    // Restructure the data
    const structuredData = result.rows.map((row) => ({
      id: row.id,
      borrowedAt: row.borrowedAt,
      returnedAt: row.returnedAt,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      user: {
        id: row["user.id"],
        name: row["user.name"],
        email: row["user.email"],
        role: row["user.role"],
        isApproved: row["user.isApproved"],
        createdAt: row["user.createdAt"],
        updatedAt: row["user.updatedAt"],
      },
      book: {
        id: row["book.id"],
        title: row["book.title"],
        author: row["book.author"],
        category: row["book.category"],
        description: row["book.description"],
        isbn: row["book.isbn"],
        availableCopies: row["book.availableCopies"],
        createdAt: row["book.createdAt"],
        updatedAt: row["book.updatedAt"],
      },
    }));

    return {
      count: result.count,
      rows: structuredData,
    };
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
