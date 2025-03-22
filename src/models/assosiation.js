import User from "./User.js";
import Book from "./Book.js";
import BorrowedBook from "./BorrowedBook.js";

User.hasMany(BorrowedBook, { foreignKey: "userId", as: "borrowedBooks" });
BorrowedBook.belongsTo(User, { foreignKey: "userId", as: "user" });

Book.hasMany(BorrowedBook, { foreignKey: "bookId", as: "borrowedBooks" });
BorrowedBook.belongsTo(Book, { foreignKey: "bookId", as: "book" });

export { User, Book, BorrowedBook };
