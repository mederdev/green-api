import userService from "../services/user.service";
import {CreateUserDto} from "../types/dto/create-user.dto";
import {LoginDto} from "../types/dto/login.dto";

class UserController {
  async signUp(req, rep) {
    try {
      return await userService.signUp(req.body as CreateUserDto);
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }
  async login (req, rep) {
    try {
      return await userService.login(req.body as LoginDto);
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }
  async info(req, rep) {
    try {
      return await userService.getInfo(req.headers.authorization);
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }
  async logout(req, rep) {
    try {
      return await userService.logout(req.headers.authorization);
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }
}

export default new UserController()
