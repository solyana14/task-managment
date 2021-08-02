import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/auth/status";
import { UserHasRole } from "../user-has-role/user-has-role.entity";
import { User } from "../user/user.entity";
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
}

