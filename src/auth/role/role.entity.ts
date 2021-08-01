import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/auth/status";
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    status: Status
}

