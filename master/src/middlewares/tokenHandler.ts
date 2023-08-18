const tokenHandler = (req, reply, done) => {
  try {
    const token = req.headers?.apikey || req.headers.authorization.split('Bearer ')[1]
    if (!token) {
      return reply.send({ error: 'Missing access token' });
    }
    req.headers.authorization = token;
    done()
  } catch (error) {
    return reply.code(401).send({ error: 'Invalid access token', message: error.message });
  }
};

export default tokenHandler;
