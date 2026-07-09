import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-student.dto';


@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
    findAll(@Query() query: QueryStudentsDto) {
      return this.studentsService.findAll(query);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if(!+id) {
      throw new NotAcceptableException("id must be a number string")
    }
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
