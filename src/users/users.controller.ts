import { Controller, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Role } from 'src/role.enum';
import { Roles } from 'src/roles.decorator';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/response-message.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token' })
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Roles(Role.admin)
    @Patch(':id/role')
    @ResponseMessage('User role updated successfully')
    @ApiOperation({ summary: "Update a user's role (admin only)" })
    @ApiBody({ type: UpdateUserRoleDto })
    @ApiResponse({ status: 200, description: 'Role updated successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - requires admin role' })
    @ApiResponse({ status: 404, description: 'User not found' })
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserRoleDto) {
        return this.usersService.updateRole(id, updateUserDto);
    }
    
}
