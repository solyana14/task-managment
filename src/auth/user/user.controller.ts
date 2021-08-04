import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { title } from 'process';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from '../update-status.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers()
    }

    @Post('/signup')
    signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
        // console.log(body)
        return this.userService.signUp(createUserDto)
    }

    @Post('/signin')
    signIn(@Body() createUserDto: CreateUserDto): Promise<object> {
        // console.log(body)
        return this.userService.signIn(createUserDto)
    }


    @Get('/:id')
    @UseGuards(AuthGuard())
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
function UserGuards() {
    throw new Error('Function not implemented.');
}

