import bcrypt from "bcryptjs";
import userRepository from "../repositories/userRepository.js";

class UserService {
  async createUser(userData) {
    const userExist = await userRepository.findByEmail(userData.email);
    if (userExist) {
      throw new Error("User already exist");
    }
    return await userRepository.createUser(userData);
  }

  async getUserByEmail(email) {
    return await userRepository.findByEmail(email);
  }

  async getUserById(id) {
    return await userRepository.findUserById(id);
  }

  async updateUser(id, updatedData) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("User not found");

    await userRepository.updateUser(id, updatedData);
    return await userRepository.findUserById(id);
  }

  async deleteUser(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("User not found");
    return await userRepository.deleteUser(id);
  }

  async getUsers(page = 1, limit = 10) {
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
  }
}

export default new UserService();
