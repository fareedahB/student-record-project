import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';
import { ResponseMessage } from 'src/response-message.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Courses')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token' })
@Controller('courses')
@UseGuards(AuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(Role.admin)
  @ResponseMessage('Course created successfully')
  @ApiOperation({ summary: 'Create a course (admin only)' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin role' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ResponseMessage('Courses retrieved successfully')
  @ApiOperation({ summary: 'List all courses' })
  @ApiResponse({ status: 200, description: 'List of courses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Course retrieved successfully')
  @ApiOperation({ summary: 'Get a course by id' })
  @ApiResponse({ status: 200, description: 'Course found' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.admin)
  @ResponseMessage('Course updated successfully')
  @ApiOperation({ summary: 'Update a course (admin only)' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin role' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(Role.admin)
  @ResponseMessage('Course deleted successfully')
  @ApiOperation({ summary: 'Delete a course (admin only)' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin role' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}