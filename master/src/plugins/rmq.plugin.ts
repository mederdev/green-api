import * as amqp from 'amqplib';
import * as fastifyPlugin from 'fastify-plugin';
import rmqService from "../services/rmq.service";
import {logger} from "../services/logger.service";

async function fastifyRabbitMQ(fastify, options) {
  const connection = await amqp.connect(options.url);
  const channel = await connection.createChannel();

  fastify.decorate('rabbitmq', { connection, channel });

  fastify.addHook('onClose', (instance, done) => {
    connection.close().then(done);
  });
  rmqService.init(connection, channel);
  logger.info('Successfully connected to RabbitMQ!')
}

export const rmqPlugin = fastifyPlugin(fastifyRabbitMQ);
