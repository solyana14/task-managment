import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { _ } from 'lodash'
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository) { }


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto)
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto)
    }
    async getTaskById(id: number): Promise<Task> {

        const found = await this.tasksRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return found
    }

    async deleteTask(id: number): Promise<void> {


        const deletedTask = await this.tasksRepository.delete(id)
        if (deletedTask.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task: Task = await this.getTaskById(id)
        task.status = status
        await this.tasksRepository.save(task)
        return task
    }
}
