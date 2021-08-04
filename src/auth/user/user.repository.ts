import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Status } from "../status";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
//tell nest that this is arepositoy of task
@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async getAllUsers(): Promise<User[]> {


        const query = this.createQueryBuilder('user');
        const users = await query.getMany();
        return users;
    }
    async signUp(createUserDto: CreateUserDto): Promise<User> {
        const { username, password } = createUserDto
        //hash password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log('salt', salt)
        console.log('hashedPassword', hashedPassword)
        const user = this.create({
            username: username,
            password: hashedPassword,
            status: Status.ACTIVE
        })
        try {
            this.save(user)
        } catch (err) {
            console.log(err)
            if (err.code === 23505) {
                throw new ConflictException('Username already exists!')
            } else {
                throw new InternalServerErrorException()
            }
        }

        return user
    }
}