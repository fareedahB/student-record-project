import { Controller, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RolesGuard } from 'src/roles.guard';
import { Role } from 'src/role.enum';
import { Roles } from 'src/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @UseGuards(RolesGuard)
    @Roles(Role.admin)
    @Patch(':id/role')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserRoleDto) {
        return this.usersService.updateRole(id, updateUserDto);
    }

}