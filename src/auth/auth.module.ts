import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission/permission.module';
import { UserHasRole } from './user-has-role/user-has-role.entity';
import { UserHasRoleModule } from './user-has-role/user-has-role.module';
import { UserHasRoleRepository } from './user-has-role/user-has-role.repository';
import { RoleHasPermissionModule } from './role-has-permission/role-has-permission.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([UserHasRoleRepository]),

        UserModule,
        RoleModule,
        PermissionModule,
        UserHasRoleModule,
        RoleHasPermissionModule,
    ]
})
export class AuthModule { }
