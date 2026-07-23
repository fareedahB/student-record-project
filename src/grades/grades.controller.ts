import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/role.enum';
import { ResponseMessage } from 'src/response-message.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Grades')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token' })
@ApiResponse({ status: 403, description: 'Forbidden - requires admin role' })
@Controller('grades')
@UseGuards(AuthGuard)
@Roles(Role.admin)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @ResponseMessage('Grade created successfully')
  @ApiOperation({ summary: 'Create a grade (admin only)' })
  @ApiBody({ type: CreateGradeDto })
  @ApiResponse({ status: 201, description: 'Grade created successfully' })
  @ApiResponse({ status: 404, description: 'Student or course not found' })
  @ApiResponse({ status: 409, description: 'A grade for this student, course, and semester already exists' })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  @ResponseMessage('Grades retrieved successfully')
  @ApiOperation({ summary: 'List all grades (admin only)' })
  @ApiResponse({ status: 200, description: 'List of grades' })
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Grade retrieved successfully')
  @ApiOperation({ summary: 'Get a grade by id (admin only)' })
  @ApiResponse({ status: 200, description: 'Grade found' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Grade updated successfully')
  @ApiOperation({ summary: 'Update a grade (admin only)' })
  @ApiBody({ type: UpdateGradeDto })
  @ApiResponse({ status: 200, description: 'Grade updated successfully' })
  @ApiResponse({ status: 404, description: 'Grade, student, or course not found' })
  @ApiResponse({ status: 409, description: 'A grade for this student, course, and semester already exists' })
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  @ResponseMessage('Grade deleted successfully')
  @ApiOperation({ summary: 'Delete a grade (admin only)' })
  @ApiResponse({ status: 200, description: 'Grade deleted successfully' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  remove(@Param('id') id: string) {
    return this.gradesService.remove(+id);
  }
}