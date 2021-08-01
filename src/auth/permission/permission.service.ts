import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../status';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {

    constructor(
        @InjectRepository(PermissionRepository)
        private permissionRepository: PermissionRepository) { }

    async createPermission(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const { permission } = createPermissionDto
        const newPermission = this.permissionRepository.create({
            permission: permission,
            status: Status.ACTIVE
        })

        await this.permissionRepository.save(newPermission)
        return newPermission;
    }

    async getAllPermissions(): Promise<Permission[]> {
        return this.permissionRepository.getAllPermissions()
    }

    async getPermissionById(id: number): Promise<Permission> {

        const found = await this.permissionRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Permission with id ${id} not found`);
        }
        return found
    }

    async deletePermission(id: number): Promise<void> {


        const deletedPermission = await this.permissionRepository.delete(id)
        if (deletedPermission.affected === 0) {
            throw new NotFoundException(`Permission with id ${id} not found`)
        }
    }
    async updatePermissionStatus(id: number, status: Status): Promise<Permission> {
        const permission: Permission = await this.getPermissionById(id)
        permission.status = status
        await this.permissionRepository.save(permission)
        return permission
    }
}
