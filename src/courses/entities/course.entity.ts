import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grade } from 'src/grades/entities/grade.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Grade, (grade) => grade.course)
  grades: Grade[];

}