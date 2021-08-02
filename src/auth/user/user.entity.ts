import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/auth/status";
import { Role } from "../role/role.entity";
import { UserHasRole } from "../user-has-role/user-has-role.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    status: Status

    //add many to many relation with role
    @ManyToMany(() => Role, role => role.users)
    @JoinTable({ name: 'UserHasRole' })
    roles: Role[];



    @OneToMany(() => UserHasRole, userHasRole => userHasRole.user)
    public userHasRole!: UserHasRole[];


}


