import User from "../models/User";

class UserRepository {
  async findById(id) {
    return await User.findByPk(id);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, updateData) {
    return await User.update();
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }

  async getAll({ limit, offset }) {
    return await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
  }
}

export default new UserRepository();
