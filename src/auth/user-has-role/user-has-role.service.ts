import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusForRelation } from "src/auth/status";
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UserHasRole } from './user-has-role.entity';
import { UserHasRoleRepository } from './user-has-role.repository';
@Injectable()
export class UserHasRoleService {

    constructor(
        @InjectRepository(UserHasRoleRepository)
        private userHasRoleRepository: UserHasRoleRepository) { }

    //here to need to check validaty of id
    async assignRole(assignRoleDto: AssignRoleDto): Promise<UserHasRole> {
        const { userId, roleId } = assignRoleDto
        const user = this.userHasRoleRepository.create({
            userId: userId,
            roleId: roleId,
            status: StatusForRelation.GRANTED
        })
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`)
        }

        await this.userHasRoleRepository.save(user)
        return user;
    }

    //needs validation
    async getUserRole(id: number): Promise<UserHasRole[]> {
        const userRoles = await this.userHasRoleRepository.find({
            where: { userId: id },
            relations: ['role'],
            select: ['role']
        })

        return userRoles;
    }

    async updateUserHasRoleStatus(id: number, status: StatusForRelation): Promise<UserHasRole> {
        const userRole: UserHasRole = await this.userHasRoleRepository.findOne({ id })
        if (!userRole) {
            throw new NotFoundException(`UserRole with id ${id} not found`)
        }
        userRole.status = status
        await this.userHasRoleRepository.save(userRole)
        return userRole
    }

    // async deleteUserHasRole(id: number): Promise<void> {


    //     const deletedUserHasRole = await this.userHasRoleRepository.delete(id)
    //     if (deletedUserHasRole.affected === 0) {
    //         throw new NotFoundException(`UserHasRole with id ${id} not found`)
    //     }
    // }
}
