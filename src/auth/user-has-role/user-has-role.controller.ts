import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { title } from 'process';

import { UpdateStatusDto, UpdateStatusForRelationDto } from '../update-status.dto';

import { UserHasRoleService } from './user-has-role.service';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UserHasRole } from './user-has-role.entity';

@Controller('user-has-role')
export class UserHasRoleController {
    constructor(private userHasRoleService: UserHasRoleService) { }

    @Get('/:id')
    getUserRole(@Param('id') id: number): Promise<UserHasRole[]> {
        return this.userHasRoleService.getUserRole(id)
    }

    @Post()
    assignRoleToUser(@Body() assignRoleDto: AssignRoleDto): Promise<UserHasRole> {
        // console.log(body)
        return this.userHasRoleService.assignRole(assignRoleDto)
    }



    // @Delete('/:id')
    // deleteUserHasRole(@Param('id') id: number): Promise<void> {
    //     return this.userHasRoleService.deleteUserHasRole(id)
    // }

    @Patch('/:id/status')
    updateUserHasRoleStatus(@Param('id') id: number,
        @Body() updateStatusForRelationDto: UpdateStatusForRelationDto): Promise<UserHasRole> {
        const { status } = updateStatusForRelationDto
        console.log(updateStatusForRelationDto)
        return this.userHasRoleService.updateUserHasRoleStatus(id, status)
    }
}
