import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import { Grade } from 'src/grades/entities/grade.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column()
  department: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, {nullable: true})
  createdBy: User;

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];

}