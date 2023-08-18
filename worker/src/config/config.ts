export default {
  getRMConfig: () => {
    const { RMQ_URI } = process.env;
    if (RMQ_URI) {
      return RMQ_URI;
    } else {
      console.error('RabbitMQ credentials error')
      process.exit();
    }
  },
  getRmqQueue: () => {
    const { QUEUE_NAME } = process.env;
    if (QUEUE_NAME) {
      return QUEUE_NAME;
    } else {
      console.error('RabbitMQ queue credentials error')
      process.exit();
    }
  },
  getJWTConfig: () => {
    const { JWT_SECRET, JWT_EXPIRATION_ACCESS, JWT_EXPIRATION_REFRESH} = process.env;
    if (JWT_SECRET && JWT_EXPIRATION_ACCESS && JWT_EXPIRATION_REFRESH) {
      return {
        jwtSecret: JWT_SECRET,
        accessTokenExpiration: JWT_EXPIRATION_ACCESS,
        refreshTokenExpiration: JWT_EXPIRATION_REFRESH
      };
    } else {
      console.error('JWT credentials error');
      process.exit();
    }
  },
  getHashConfig: () => {
    const { PASSWORD_SALT } = process.env;
    if (PASSWORD_SALT) {
      return {
        salt: Number(PASSWORD_SALT),
      }
    } else {
      console.error('Hash salt credential error');
      process.exit();
    }
  }
}
