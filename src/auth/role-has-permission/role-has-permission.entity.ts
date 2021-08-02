import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { StatusForRelation } from "src/auth/status";
import { Role } from "../role/role.entity";
import { Permission } from "../permission/permission.entity";

@Entity()
export class RoleHasPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    permissionId!: number;

    @PrimaryColumn()
    roleId!: number;

    @Column()
    status!: StatusForRelation

    @ManyToOne(() => Permission, permission => permission.roles)
    public role!: Role;

    @ManyToOne(() => Role, role => role.permissions)
    public permission!: Permission;


}


