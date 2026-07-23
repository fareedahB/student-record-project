import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(15)
  @Max(80)
  age: number;

  @IsString()
  @IsNotEmpty()
  department: string;
}