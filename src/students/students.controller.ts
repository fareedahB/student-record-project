import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UnauthorizedException, NotAcceptableException , UseGuards, Req} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-student.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';
import type { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/response-message.decorator';


@ApiTags('Students')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token' })
@Controller('students')
@UseGuards(AuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles(Role.admin)
  @ResponseMessage('Student created successfully')
  @ApiOperation({ summary: 'Create a student record (admin only)' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin role' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() createStudentDto: CreateStudentDto, @Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.studentsService.create(createStudentDto, req.user);
  }

  @Get()
  @ResponseMessage('Students retrieved successfully')
  @ApiOperation({ summary: 'List students (search, sort, paginate)' })
  @ApiResponse({ status: 200, description: 'Paginated list of students' })
    findAll(@Query() query: QueryStudentsDto) {
      return this.studentsService.findAll(query);
    }

  @Get(':id')
  @ResponseMessage('Student retrieved successfully')
  @ApiOperation({ summary: 'Get a student by id' })
  @ApiResponse({ status: 200, description: 'Student found' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string) {
    if(!+id) {
      throw new NotAcceptableException("id must be a number string")
    }
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Student updated successfully')
  @ApiOperation({ summary: 'Update a student record' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @Roles(Role.admin)
  @ResponseMessage('Student deleted successfully')
  @ApiOperation({ summary: 'Delete a student record (admin only)' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin role' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
