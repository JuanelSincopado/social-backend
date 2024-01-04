const bcryptjs = require('bcryptjs');

const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
}

export default hashPassword;