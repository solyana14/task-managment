import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

//tell nest that this is arepositoy of task
@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async getAllUsers(): Promise<User[]> {


        const query = this.createQueryBuilder('user');
        const users = await query.getMany();
        return users;
    }
}