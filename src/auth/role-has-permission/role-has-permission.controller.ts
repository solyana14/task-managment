import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { title } from 'process';

import { UpdateStatusDto, UpdateStatusForRelationDto } from '../update-status.dto';


import { AssignPermissionToRoleDto } from './dto/assign-permission-to-role.dto';
import { RoleHasPermissionService } from './role-has-permission.service';
import { RoleHasPermission } from './role-has-permission.entity';

@Controller('role-has-permission')
export class RoleHasPermissionController {
    constructor(private roleHasPermissionService: RoleHasPermissionService) { }

    @Get('/:id')
    getUserRole(@Param('id') id: number): Promise<RoleHasPermission[]> {
        return this.roleHasPermissionService.getRolePermission(id)
    }

    @Post()
    assignRoleToUser(@Body() assignPermissionToRoleDto: AssignPermissionToRoleDto): Promise<RoleHasPermission> {
        // console.log(body)
        return this.roleHasPermissionService.assignRoleToPermission(assignPermissionToRoleDto)
    }



    // @Delete('/:id')
    // deleteUserHasRole(@Param('id') id: number): Promise<void> {
    //     return this.roleHasPermissionService.deleteRoleHasPermission(id)
    // }

    @Patch('/:id')
    updateUserHasRoleStatus(@Param('id') id: number,
        @Body() updateStatusForRelationDto: UpdateStatusForRelationDto): Promise<RoleHasPermission> {
        const { status } = updateStatusForRelationDto
        console.log(updateStatusForRelationDto)
        return this.roleHasPermissionService.updateRoleHasPermissionStatus(id, status)
    }
}
