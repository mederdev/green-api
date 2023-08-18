import { Connection } from 'amqplib';
import { randomUUID } from "crypto";

import { SendMessage } from "../types/send-message.type";
import { Channel } from "../types/interfaces/channel.interface";
import config from "../config/config";

class RmqService {
  protected connection: Connection;
  protected channel: Channel;

  private queueName = 'default';
  init(connection, channel) {
    this.connection = connection;
    this.channel = channel;
    this.queueName = config.getRmqQueue();
  }
  async sendMessage(message): Promise<SendMessage> {
    try {
      const { queue } = await this.channel.assertQueue('', { exclusive: true });

      const correlationId = randomUUID();

      const responsePromise: Promise<string> = new Promise((resolve, reject) => {
        this.channel.consume(queue, (msg) => {
          if (msg.properties.correlationId === correlationId) {
            resolve(msg.content.toString());
          }
          reject('Wrong queue item')
        }, { noAck: true });
      });

      this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)), {
        correlationId,
        replyTo: queue
      });

      const result = await responsePromise;
      return JSON.parse(result);
    } catch (err) {
      return {
        message: err.message
      }
    }
  }
}
export default new RmqService();

