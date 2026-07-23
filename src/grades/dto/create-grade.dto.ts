import { IsInt, IsNotEmpty, IsIn, Min, Max } from 'class-validator';

export class CreateGradeDto {
  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @IsNotEmpty()
  @IsIn(['first', 'second'])
  semester: string;

  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  courseId: number;
}