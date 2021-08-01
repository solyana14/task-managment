import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../status';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository)
        private roleRepository: RoleRepository) { }

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const { role, } = createRoleDto
        const newRole = this.roleRepository.create({
            role: role,
            status: Status.ACTIVE
        })

        await this.roleRepository.save(newRole)
        return newRole;
    }

    async getAllRoles(): Promise<Role[]> {
        return this.roleRepository.getAllRoles()
    }

    async getRoleById(id: number): Promise<Role> {

        const found = await this.roleRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Role with id ${id} not found`);
        }
        return found
    }

    async deleteRole(id: number): Promise<void> {


        const deletedRole = await this.roleRepository.delete(id)
        if (deletedRole.affected === 0) {
            throw new NotFoundException(`Role with id ${id} not found`)
        }
    }
    async updateRoleStatus(id: number, status: Status): Promise<Role> {
        const role: Role = await this.getRoleById(id)
        role.status = status
        await this.roleRepository.save(role)
        return role
    }
}
