import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/auth/status";
import { UserHasRole } from "../user-has-role/user-has-role.entity";
import { User } from "../user/user.entity";
import { Permission } from "../permission/permission.entity";
import { RoleHasPermission } from "../role-has-permission/role-has-permission.entity";
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    status: Status

    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @OneToMany(() => UserHasRole, userHasRole => userHasRole.role)
    public userHasRole!: UserHasRole[];


    //  
    @ManyToMany(() => Permission, permission => permission.roles, {
        cascade: true
    })
    @JoinTable({ name: 'RoleHasPermission' })
    permissions: Permission[];



    @OneToMany(() => RoleHasPermission, roleHasPermission => roleHasPermission.role)
    public roleHasPermission!: RoleHasPermission[];

}

