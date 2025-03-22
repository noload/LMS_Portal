import User from "../models/User.js";

class UserRepository {
  async findById(id) {
    return await User.findByPk(id);
  }

  async findByEmail(email) {
    return await User.findOne({
      where: { email },
    });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, updateData) {
    return await User.update(updateData, { where: { id } });
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }

  async getAll({ limit, offset }) {
    return await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      raw: true,
      attributes: { exclude: ["password"] },
    });
  }

  async approve(id) {
    await User.update({ isApproved: true }, { where: { id } });
    return await User.findOne({
      where: { id },
    });
  }
}

export default new UserRepository();
