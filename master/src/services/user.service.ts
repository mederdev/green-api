import RmqService from "./rmq.service";
import { LoginDto } from "../types/dto/login.dto";
import { CreateUserDto } from "../types/dto/create-user.dto";
import { EventsEnum } from "../types/enums/events.enum";

class UserService {
  async signUp(data: CreateUserDto) {
    return await RmqService.sendMessage({
      event: EventsEnum.SIGN_UP,
      data,
    });
  }
  async login(user: LoginDto) {
    return await RmqService.sendMessage({
      event: EventsEnum.LOGIN,
      data: user
    });
  }
  async getInfo(token: string) {
    return await RmqService.sendMessage({
      event: EventsEnum.INFO,
      data: token,
    })
  }
  async logout(token: string) {
    return await RmqService.sendMessage({
      event: EventsEnum.LOGOUT,
      data: token,
    })
  }
}
export default new UserService()
