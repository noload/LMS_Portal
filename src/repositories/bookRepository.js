import Book from "../models/Book.js";

class BookRepository {
  async create(bookData) {
    return await Book.create(bookData);
  }

  async findById(id) {
    return await Book.findByPk(id);
  }

  async getAll({ limit, offset, filters = {} }) {
    const whereClause = {};

    if (filters.category) {
      whereClause.category = filters.category;
    }
    if (filters.author) {
      whereClause.author = filters.author;
    }

    return await Book.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
  }

  async update(id, updateData) {
    await Book.update(updateData, { where: { id } });
    return await Book.findByPk(id);
  }

  async delete(id) {
    return await Book.destroy({ where: { id } });
  }
}

export default new BookRepository();
