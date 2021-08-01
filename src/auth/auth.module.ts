import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission/permission.module';
@Module({
    imports: [
        UserModule,
        RoleModule,
        PermissionModule
    ]
})
export class AuthModule { }
