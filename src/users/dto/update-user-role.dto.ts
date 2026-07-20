import { IsEnum } from "class-validator";
import { Role } from "src/role.enum";

export class UpdateUserRoleDto {
  @IsEnum(Role)
  role: Role;
}
