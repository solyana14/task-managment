import { EntityRepository, Repository } from "typeorm";
import { UserHasRole } from "./user-has-role.entity";


//tell nest that this is arepositoy of task
@EntityRepository(UserHasRole)
export class UserHasRoleRepository extends Repository<UserHasRole>{

    async getUserHasRole(): Promise<UserHasRole[]> {


        const query = this.createQueryBuilder('UserHasRole');
        const userHasRoles = await query.getMany();
        return userHasRoles;
    }
}