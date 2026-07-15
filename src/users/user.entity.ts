import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

}