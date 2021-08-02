import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserHasRoleRepository } from './user-has-role.repository';
import { UserHasRoleController } from './user-has-role.controller';
import { UserHasRoleService } from './user-has-role.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([UserHasRoleRepository]),

    ],
    controllers: [UserHasRoleController],
    providers: [UserHasRoleService]
})
export class UserHasRoleModule { }
