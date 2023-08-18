import { fastify } from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import { rmqPlugin } from "./plugins/rmq.plugin";
import { logger } from "./services/logger.service";
import config from "./config/config";
import userRoutes from "./routes/user.routes";

async function main() {
  const server = fastify({
    logger,
  });
  await server.register(rmqPlugin, {
    url: config.getRMConfig()
  })
  await server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing server API',
        version: '0.1.0'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      tags: [{ name: "User", description: "User auth requests" }],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      },
      security: [{ apiKey: [] }],
    }
  });
  await server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  userRoutes(server);

  await server.ready();
  server.swagger();

  await server.listen({
    port: config.getPort(),
    host: config.getHost(),
  });
}
main();
