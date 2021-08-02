import { EntityRepository, Repository } from "typeorm";
import { RoleHasPermission } from "./role-has-permission.entity";

//tell nest that this is arepositoy of task
@EntityRepository(RoleHasPermission)
export class RoleHasPermissionRepository extends Repository<RoleHasPermission>{

    async getRoleHasPermission(): Promise<RoleHasPermission[]> {


        const query = this.createQueryBuilder('RoleHasPermission');
        const tasks = await query.getMany();
        return tasks;
    }
}