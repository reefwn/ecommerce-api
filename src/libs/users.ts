import User from '../entities/user.schema';

export const toUserEntity = async (dto: { email: string, password: string }) => {
  const { email, password } = dto;

  const user = new User();
  user.email = email;
  user.password = await Bun.password.hash(password);

  return user;
}