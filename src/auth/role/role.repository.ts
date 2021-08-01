import { EntityRepository, Repository } from "typeorm";
import { Role } from "./role.entity";

//tell nest that this is arepositoy of task
@EntityRepository(Role)
export class RoleRepository extends Repository<Role>{

    async getAllRoles(): Promise<Role[]> {
        const query = this.createQueryBuilder('role');
        const role = await query.getMany();
        return role;
    }
}