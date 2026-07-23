import { setSeederFactory } from 'typeorm-extension';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

export default setSeederFactory(User, async (faker) => {
    
  const user = new User();
  
  user.username = faker.internet.userName();
  user.password = await bcrypt.hash('Password123!', 10);
  
  return user;
});