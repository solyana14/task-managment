import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/auth/status";
@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    permission: string;

    @Column()
    status: Status
}
