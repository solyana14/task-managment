import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';
import { UpdateStatusDto } from '../update-status.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private permissionService: PermissionService) { }

    @Post()
    createPermission(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
        // console.log(body)
        return this.permissionService.createPermission(createPermissionDto)
    }

    @Get()
    getAllPermissions(): Promise<Permission[]> {
        return this.permissionService.getAllPermissions()
    }

    @Get('/:id')
    getPermissionById(@Param('id') id: number): Promise<Permission> {
        return this.permissionService.getPermissionById(id)
    }

    @Delete('/:id')
    deletePermission(@Param('id') id: number): Promise<void> {
        return this.permissionService.deletePermission(id)
    }

    @Patch('/:id/status')
    updatePermissionStatus(@Param('id') id: number,
        @Body() updateStatus: UpdateStatusDto): Promise<Permission> {
        const { status } = updateStatus
        // console.log(updateStatus)
        return this.permissionService.updatePermissionStatus(id, status)
    }

}
