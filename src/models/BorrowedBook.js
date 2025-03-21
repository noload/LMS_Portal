import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Book from "./Book.js";

const BorrowedBook = sequelize.define(
  "BorrowedBook",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Book, key: "id" },
      onDelete: "CASCADE",
    },
    borrowDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    returnDate: {
      type: DataTypes.DATE,
      validate: {
        isAfterBorrow(value) {
          if (value && this.borrowDate && value < this.borrowDate) {
            throw new Error("Return date must be after borrow date");
          }
        },
      },
    },
    returnedAt: { type: DataTypes.DATE },
    status: {
      type: DataTypes.ENUM("borrowed", "returned"),
      defaultValue: "borrowed",
    },
  },
  {
    hooks: {
      beforeUpdate: (borrowedBook) => {
        if (borrowedBook.status === "returned" && !borrowedBook.returnedAt) {
          borrowedBook.returnedAt = new Date();
        }
      },
    },
    timestamps: true,
  }
);

export default BorrowedBook;
