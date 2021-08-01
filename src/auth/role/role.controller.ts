import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { UpdateStatusDto } from '../update-status.dto';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Post()
    createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        // console.log(body)
        return this.roleService.createRole(createRoleDto)
    }

    @Get()
    getAllRoles(): Promise<Role[]> {
        return this.roleService.getAllRoles()
    }

    @Get('/:id')
    getRoleById(@Param('id') id: number): Promise<Role> {
        return this.roleService.getRoleById(id)
    }

    @Delete('/:id')
    deleteRole(@Param('id') id: number): Promise<void> {
        return this.roleService.deleteRole(id)
    }

    @Patch('/:id/status')
    updateRoleStatus(@Param('id') id: number,
        @Body() updateStatus: UpdateStatusDto): Promise<Role> {
        const { status } = updateStatus
        console.log(updateStatus)
        return this.roleService.updateRoleStatus(id, status)
    }

}
