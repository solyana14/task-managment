import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleHasPermissionController } from './role-has-permission.controller';


import { RoleHasPermissionRepository } from './role-has-permission.repository';
import { RoleHasPermissionService } from './role-has-permission.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([RoleHasPermissionRepository]),

    ],
    controllers: [RoleHasPermissionController],
    providers: [RoleHasPermissionService]
})
export class RoleHasPermissionModule { }
