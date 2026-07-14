import { setSeederFactory } from 'typeorm-extension';
import { User } from './user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  return user;
});