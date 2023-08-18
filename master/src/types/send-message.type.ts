import { ITokens } from "./interfaces/tokens.interface";
import { IUser } from "./interfaces/user.interface";
import { IMessage } from "./interfaces/message.interface";

export type SendMessage = ITokens | IUser | IMessage;
