import { IsString, IsNotEmpty, MinLength, Matches, IsEnum} from "class-validator";
import { Role } from "src/role.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, { message: 'Password must contain at least one special character'})
    password: string;

}