import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike} from 'typeorm';
import { Student } from './entities/student.entity';
import { QueryStudentsDto } from './dto/query-student.dto';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto, user: { sub: number }): Promise<Student> {
    await this.ensureEmailIsUnique(dto.email);
    const student = this.studentRepository.create({
      ...dto,
      createdBy: { userId: user.sub } as User,
    });
    return this.studentRepository.save(student);
  }
  
  //   findAll(): Promise<Student[]> {
  //   return this.studentRepository.find();
  // }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) throw new NotFoundException(`Student with id ${id} not found`);
    return student!;
  }

  async findAll(query: QueryStudentsDto) {
    const { search = null, sortBy = 'id', order = 'asc', page = 1, limit = 10 } = query;

    const where = search
      ? [
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
        ]
      : {};

    const [data, total] = await this.studentRepository.findAndCount({
      where,
      order: { [sortBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      record: data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    if (dto.email && dto.email !== student.email) {
      await this.ensureEmailIsUnique(dto.email);
    }
    Object.assign(student, dto);
    return this.studentRepository.save(student);
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Student with id ${id} not found`);
  }

  private async ensureEmailIsUnique(email: string): Promise<void> {
    const existing = await this.studentRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException(`Email ${email} already exist`);
  }

}
