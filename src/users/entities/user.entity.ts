import { Role } from 'src/role.enum';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Student } from 'src/students/entities/student.entity';

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

  @OneToMany(() => Student, (student) => student.createdBy)
  students: Student[];
}