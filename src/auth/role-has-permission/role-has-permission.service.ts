import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusForRelation } from "src/auth/status";

import { AssignPermissionToRoleDto } from './dto/assign-permission-to-role.dto';
import { RoleHasPermission } from './role-has-permission.entity';
import { RoleHasPermissionRepository } from './role-has-permission.repository';

@Injectable()
export class RoleHasPermissionService {

    constructor(
        @InjectRepository(RoleHasPermissionRepository)
        private roleHasPermissionRepository: RoleHasPermissionRepository) { }

    //here to need to check validaty of id
    async assignRoleToPermission(assignPermissionToRoleDto: AssignPermissionToRoleDto): Promise<RoleHasPermission> {
        const { permissionId, roleId } = assignPermissionToRoleDto
        const permissionToRole = this.roleHasPermissionRepository.create({
            permissionId: permissionId,
            roleId: roleId,
            status: StatusForRelation.GRANTED
        })
        if (!permissionToRole) {
            throw new NotFoundException(`User with id ${permissionId} not found`)
        }

        await this.roleHasPermissionRepository.save(permissionToRole)
        return permissionToRole;
    }

    //needs validation
    async getRolePermission(id: number): Promise<RoleHasPermission[]> {
        const rolePermission = await this.roleHasPermissionRepository.find({
            where: { roleId: id },
            relations: ['permission'],
            select: ['permission']
        })

        return rolePermission;
    }

    async updateRoleHasPermissionStatus(id: number, status: StatusForRelation): Promise<RoleHasPermission> {
        const roleHasPermission: RoleHasPermission = await this.roleHasPermissionRepository.findOne({ id })
        if (!roleHasPermission) {
            throw new NotFoundException(`RoleHasPermission with id ${id} not found`)
        }
        roleHasPermission.status = status
        await this.roleHasPermissionRepository.save(roleHasPermission)
        return roleHasPermission
    }


    //needs abit modification
    async deleteRoleHasPermission(id: number): Promise<void> {
        const roleHasPermission = await this.roleHasPermissionRepository.findOne(id)

        if (!roleHasPermission) {
            throw new NotFoundException(`RoleHasPermission with id ${id} not found`)
        }
        await this.roleHasPermissionRepository.remove(roleHasPermission)
    }
}
