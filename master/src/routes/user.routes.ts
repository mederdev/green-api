import { FastifyInstance } from "fastify";

import tokenHandler from "../middlewares/tokenHandler";
import userController from "../controllers/user.controller";
import swaggerHelper from "../utils/swaggerHelper";

export default function userRoutes(server: FastifyInstance) {
  server.post("/api/signup", swaggerHelper.signIn(), userController.signUp);
  server.post("/api/login", swaggerHelper.login(), userController.login);
  server.get('/api/info',{ ...swaggerHelper.info(), preHandler: tokenHandler }, userController.info);
  server.post('/api/logout',{ ...swaggerHelper.logout(), preHandler: tokenHandler }, userController.logout)
}
