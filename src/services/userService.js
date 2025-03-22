import bcrypt from "bcryptjs";
import userRepository from "../repositories/userRepository.js";
import { generateToken } from "./jwtService.js";
import AppError from "../utils/errorHandler.js";

class UserService {
  async createUser(userData) {
    const { email } = userData;
    const userExist = await userRepository.findByEmail(email);
    if (userExist) {
      throw new AppError("User already exists", 400);
    }
    return await userRepository.create(userData);
  }

  async login(user) {
    const { email, password } = user;
    const userExist = await userRepository.findByEmail(email);
    if (!userExist) {
      throw new AppError("User not found", 404);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordCorrect) {
      throw new AppError("Invalid credentials", 401);
    }

    return generateToken(userExist);
  }

  async getUserByEmail(email) {
    try {
      return await userRepository.findByEmail(email);
    } catch (error) {
      console.error("Error in getUserByEmail:", error.message);
      throw new AppError("Failed to fetch user by email");
    }
  }

  async getUserById(id) {
    try {
      return await userRepository.findById(id);
    } catch (error) {
      console.error("Error in getUserById:", error.message);
      throw new AppError("Failed to fetch user by ID");
    }
  }

  async updateUser(id, updatedData) {
    try {
      const user = await userRepository.findById(id);
      if (!user) throw new AppError("User not found");

      await userRepository.update(id, updatedData);
      return await userRepository.findById(id);
    } catch (error) {
      console.error("Error in updateUser:", error.message);
      throw new AppError(error.message || "Failed to update user");
    }
  }

  async deleteUser(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) throw new AppError("User not found");

      return await userRepository.delete(id);
    } catch (error) {
      console.error("Error in deleteUser:", error.message);
      throw new AppError(error.message || "Failed to delete user");
    }
  }

  async getUsers(page = 1, limit = 10) {
    try {
      page = parseInt(page);
      limit = parseInt(limit);

      const offset = (page - 1) * limit;
      const { rows: users, count: totalItems } = await userRepository.getAll({
        limit,
        offset,
      });
      return {
        data: users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          limit,
        },
      };
    } catch (error) {
      console.error("Error in getUsers:", error.message);
      throw new AppError(error.message || "Failed to fetch users");
    }
  }

  async approveUser(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) throw new AppError("User not found");
      return await userRepository.approve(id);
    } catch (error) {
      console.error("Error in approveuser:", error.message);
      throw new AppError("Failed to approve users");
    }
  }
}

export default new UserService();
