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
}

export default new UserController();
