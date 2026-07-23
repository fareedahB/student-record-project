import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';

@Entity('grades')
@Unique(['student', 'course', 'semester'])
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  semester: string;

  @ManyToOne(() => Student, { nullable: false })
  student: Student;

  @ManyToOne(() => Course, { nullable: false })
  course: Course;

}