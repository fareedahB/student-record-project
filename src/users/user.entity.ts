import { Role } from 'src/role.enum';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';


@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    default: Role.user,
  })
  role: Role;

}