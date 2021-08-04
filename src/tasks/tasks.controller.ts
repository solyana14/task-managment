import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskstatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    @UseGuards(AuthGuard())
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        // console.log(body)
        return this.tasksService.createTask(createTaskDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTasks(@Param('id') id: number,
        @Body() updateTaskstatusDto: UpdateTaskstatusDto): Promise<Task> {
        const { status } = updateTaskstatusDto
        console.log(updateTaskstatusDto)
        return this.tasksService.updateTaskStatus(id, status)
    }

}
