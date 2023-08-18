export interface Channel {
  sendToQueue(queue: string, data: Buffer, options: {});
  assertQueue(queue: string, options: {});
  consume(queue: string, callback, options: {});
  ack(msg: string);
  prefetch(n: number);
}
