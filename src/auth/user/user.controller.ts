import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { title } from 'process';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from '../update-status.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers()
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        // console.log(body)
        return this.userService.createUser(createUserDto)
    }

    @Get('/:id')
    getUserById(@Param('id') id: number): Promise<User> {
        return this.userService.getUserById(id)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id)
    }

    @Patch('/:id')
    updateUserStatus(@Param('id') id: number,
        @Body() updateStatus: UpdateStatusDto): Promise<User> {
        const { status } = updateStatus
        console.log(updateStatus)
        return this.userService.updateUserStatus(id, status)
    }
}
