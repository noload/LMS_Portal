import userService from "../services/userService.js";

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const response = await userService.getUsers(page, limit);
      return res
        .status(200)
        .json({ message: "User fetched successsfully", ...response });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.status(200).json({
        sucess: true,
        message: user ? "User fetched successfully" : "User not found",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userService.updateUser(id, req.body);
      return res.status(200).json({
        success: true,
        message: "User Updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      return res.status(200).json({
        success: true,
        mmessage: "User deleted successflly",
      });
    } catch (error) {
      next(error);
    }
  }

  async approveUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.approveUser(id);
      return res.status(200).json({
        success: true,
        message: "User approved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
