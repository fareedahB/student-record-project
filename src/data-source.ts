import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Student } from './students/entities/student.entity';
import { User } from './users/entities/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Student, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
