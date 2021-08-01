import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/auth/status";
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
}


