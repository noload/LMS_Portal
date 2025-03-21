import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define(
  "Book",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
    availableCopies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 0 },
    },
  },
  {
    indexes: [{ unique: true, fields: ["isbn"] }],
    timestamps: true,
  }
);

export default Book;
