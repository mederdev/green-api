import * as bcrypt from 'bcryptjs';

import config from "../config/config";

export default {
  compare: async (password, storedHash) => {
    return await bcrypt.compare(password, storedHash);
  },
  hash: async (password) => {
    const result = await bcrypt.hash(password, config.getHashConfig().salt);
    return result || password;
  }
}
