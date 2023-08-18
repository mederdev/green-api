import { Connection } from 'amqplib';

import { Channel } from "../types/interfaces/channel.interface";
import userService from "./user.service";
import config from "../config/config";
import {logger} from "./logger.service";
import {EventsEnum} from "../types/enums/events.enum";

class RmqService {
  protected connection: Connection;
  protected channel: Channel;
  private queueName = 'default'

  init(connection, channel) {
    this.connection = connection;
    this.channel = channel;
    this.queueName = config.getRmqQueue();
  }

  validateData(type: string, data) {
    switch (type) {
      case EventsEnum.INFO:
      case EventsEnum.LOGOUT: {
        return typeof data === 'string';
      }
      case EventsEnum.SIGN_UP: {
        return Object.keys(data).every((i) => ['email', 'password', 'name'].includes(i));
      }
      case EventsEnum.LOGIN: {
        return Object.keys(data).every((i) => ['email', 'password'].includes(i));
      }
    }
  }

  async handleMessages(): Promise<void> {
    await this.channel.assertQueue(this.queueName, { durable: true });
    this.channel.prefetch(1);

    logger.info('Waiting for RPC requests...');

    this.channel.consume(this.queueName, async (msg) => {
      logger.info(`[MESSAGE ID]: ${msg.properties.correlationId}\nStarted process!`)
      let response = '';
      try {
        const request = JSON.parse(msg.content.toString());

        const isValid = this.validateData(request.event, request.data);

        if (!isValid) {
          throw new Error('Invalid data');
        }

        const result = await userService[request.event](request.data);

        response = JSON.stringify(result);
      } catch (err) {
        response = err.message
        logger.error(`[MESSAGE ID]: ${msg.properties.correlationId}\nRequest processing error: ${response}`);
      } finally {
        this.channel.ack(msg);
        this.channel.sendToQueue(msg.properties.replyTo, Buffer.from(response), {
          correlationId: msg.properties.correlationId
        });
        logger.info(`[MESSAGE ID]: ${msg.properties.correlationId}\nFinished!`)
      }
    }, {});
  }
}

export default new RmqService()
