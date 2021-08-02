import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/auth/status";
import { Role } from "../role/role.entity";
import { RoleHasPermission } from "../role-has-permission/role-has-permission.entity";
@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    permission: string;

    @Column()
    status: Status

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];

    @OneToMany(() => RoleHasPermission, roleHasPermission => roleHasPermission.role)
    public roleHasPermission!: RoleHasPermission[];
}
