import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Status } from "src/auth/status";
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from '../jwt-payload-interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jtwService: JwtService
    ) { }



    async signUp(createUserDto: CreateUserDto): Promise<User> {
        // const { username, password } = createUserDto
        // const user = this.userRepository.create({
        //     username: username,
        //     password: password,
        //     status: Status.ACTIVE
        // })

        // await this.userRepository.save(user)
        return this.userRepository.signUp(createUserDto);
    }

    async signIn(createUserDto: CreateUserDto): Promise<object> {
        const { username, password } = createUserDto
        const user = await this.userRepository.findOne({ where: { username } })
        if (user && bcrypt.compare(password, user.password)) {
            const payload: JwtPayload = { user }
            const accessToken: string = await this.jtwService.sign(payload)
            return { accessToken }
        }
        else {
            throw new UnauthorizedException("Please check in your login credentials")
        }
        return
    }
    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers()
    }

    async getUserById(id: number): Promise<User> {

        const found = await this.userRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return found
    }

    async deleteUser(id: number): Promise<void> {


        const deletedUser = await this.userRepository.delete(id)
        if (deletedUser.affected === 0) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
    }
    async updateUserStatus(id: number, status: Status): Promise<User> {
        const user: User = await this.getUserById(id)
        user.status = status
        await this.userRepository.save(user)
        return user
    }
}
