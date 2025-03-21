import userService from "../services/userService.js";

class AuthController {
  async register(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({
        suceess: true,
        message: "User Registered successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res) {
    try {
      const token = await userService.login(req.body);
      return res
        .status(200)
        .json({ success: true, message: "User LoggedIn Successfully", token });
    } catch (error) {
      console.log("Error", error);
      return res.status(500).json({
        success: false,
        message: error.message | error,
      });
    }
  }
}

export default new AuthController();
