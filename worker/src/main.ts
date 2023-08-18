import { fastify } from "fastify";

import RmqService from "./services/rmq.service";
import config from "./config/config";
import { rmqPlugin } from "./plugins/rmq.plugin";
async function main() {
  const server = fastify({});
  await server.register(rmqPlugin, {
    url: config.getRMConfig()
  })

  RmqService.handleMessages()
    .catch(console.error)

  await server.listen();
}
main();
