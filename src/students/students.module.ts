import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, ResponseInterceptor],
  imports: [TypeOrmModule.forFeature([Student])]
})
export class StudentsModule {}
