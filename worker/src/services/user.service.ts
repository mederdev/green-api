import jwtService from "./jwt.service";
import hashHelper from "../common/hashHelper";
import { IUser } from "../types/interfaces/user.interface";
import { LoginDto } from "../types/dto/login.dto";
import { IMessage } from "../types/interfaces/message.interface";
import { ITokens } from "../types/interfaces/tokens.interface";

class UserService {
  private users = new Map<string, IUser>()

  async signUp(user: IUser): Promise<ITokens | IMessage> {
    try {
      if (this.users.has(user.email)) {
        return {
          message: 'User already exist'
        };
      }
      const { refreshToken, accessToken} = jwtService.generateTokens({ email: user.email, password: user.password });
      const hashedPassword = await hashHelper.hash(user.password);

      this.users.set(user.email, {...user, refreshToken, password: hashedPassword})

      return {
        accessToken,
        refreshToken
      };
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }
  async login(user: LoginDto): Promise<ITokens | IMessage> {
    try {
      const localUser = this.users.get(user.email);

      if (!localUser) {
        return {
          message: 'User not found',
        };
      }

      const isPassCorrect = await hashHelper.compare(user.password, localUser.password);

      if (isPassCorrect) {
        return jwtService.generateTokens({email: user.email, password: user.password})
      }

      return {
        message: 'Incorrect password'
      }
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }

  async info(token: string): Promise<IUser | IMessage> {
    try {
      const decodedUser = jwtService.verify(token);

      const user = this.users.get(decodedUser.email);

      if (!user) {
        return {
          message: 'User not found'
        }
      }
      return user;
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }

  async logout(token: string): Promise<IMessage> {
    try {
      const decodedUser = jwtService.verify(token);

      const user = this.users.get(decodedUser.email);

      if (!user) {
        return {
          message: 'User not found'
        }
      }

      this.users.delete(decodedUser.email);
      return {
        message: 'Successfully logged out'
      };
    } catch (err) {
      return {
        message: err.message,
      };
    }
  }
}

export default new UserService()
