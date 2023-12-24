import User from '../entities/user.schema';

export const toUserEntity = (dto: { email: string, password: string }) => {
  const { email, password } = dto;

  const user = new User();
  user.email = email;
  user.password = password;

  return user;
}