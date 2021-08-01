import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status";
import { Task } from "./task.entity";

//tell nest that this is arepositoy of task
@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto
        const task = this.create({
            title: title,
            description: description,
            status: TaskStatus.OPEN
        })

        await this.save(task)
        return task;
    }
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { search, status } = filterDto

        const query = this.createQueryBuilder('task');

        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` }
            )
        }
        if (status) {
            query.andWhere('task.status=:status', { status })
        }
        const tasks = await query.getMany();
        return tasks;
    }
}