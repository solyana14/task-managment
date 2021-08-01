import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    @Column()
    description: string;

    @Column()
    status: TaskStatus
}