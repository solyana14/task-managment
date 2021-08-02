import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { StatusForRelation } from "src/auth/status";
import { User } from "../user/user.entity";
import { Role } from "../role/role.entity";

@Entity()
export class UserHasRole {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    userId!: number;

    @PrimaryColumn()
    roleId!: number;

    @Column()
    status!: StatusForRelation

    @ManyToOne(() => User, user => user.roles)
    public role!: Role;

    @ManyToOne(() => Role, role => role.users)
    public user!: User;


}


