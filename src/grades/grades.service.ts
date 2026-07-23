import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const { score, semester, studentId, courseId } = createGradeDto;

    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const grade = this.gradeRepository.create({ score, semester, student, course });

    try {
      return await this.gradeRepository.save(grade);
    } catch (err) {
      if (err.code === '23505') { 
        throw new ConflictException('A grade for this student, course, and semester already exists');
      }
      throw err;
    }
  }

  findAll(): Promise<Grade[]> {
    return this.gradeRepository.find({ relations: ['student', 'course'] });
  }

  async findOne(id: number): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({
      where: { id },
      relations: ['student', 'course'],
    });
    if (!grade) {
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    return grade;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const grade = await this.findOne(id);
    const { studentId, courseId, ...rest } = updateGradeDto;

    if (studentId !== undefined) {
      const student = await this.studentRepository.findOne({ where: { id: studentId } });
      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found`);
      }
      grade.student = student;
    }

    if (courseId !== undefined) {
      const course = await this.courseRepository.findOne({ where: { id: courseId } });
      if (!course) {
        throw new NotFoundException(`Course with ID ${courseId} not found`);
      }
      grade.course = course;
    }

    Object.assign(grade, rest);

    try {
      return await this.gradeRepository.save(grade);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('A grade for this student, course, and semester already exists');
      }
      throw err;
    }
  }

  async remove(id: number): Promise<void> {
    const grade = await this.findOne(id);
    await this.gradeRepository.remove(grade);
  }
}