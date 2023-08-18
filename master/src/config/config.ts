export default {
  getRMConfig: () => {
    const { RMQ_URI } = process.env;
    if (RMQ_URI) {
      return RMQ_URI;
    } else {
      console.error('RabbitMQ credentials error');
      process.exit();
    }
  },
  getRmqQueue: () => {
    const { QUEUE_NAME } = process.env;
    if (QUEUE_NAME) {
      return QUEUE_NAME;
    } else {
      console.error('RabbitMQ queue credentials error');
      process.exit();
    }
  },
  getPort() {
    const { PORT } = process.env;
    if (PORT) {
      return Number(PORT);
    } else {
      console.error('PORT not found');
      process.exit();
    }
  },
  getHost() {
    const { HOST } = process.env;
    if (HOST) {
      return HOST;
    } else {
      console.error('HOST not found');
      process.exit();
    }
  }
}
