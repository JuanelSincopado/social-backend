const bcryptjs = require('bcryptjs');

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
}

export const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
  return await bcryptjs.compareSync(password, receivedPassword);
}
