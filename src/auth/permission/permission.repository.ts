import { EntityRepository, Repository } from "typeorm";
import { Permission } from "./permission.entity";

//tell nest that this is arepositoy of task
@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission>{

    async getAllPermissions(): Promise<Permission[]> {
        const query = this.createQueryBuilder('permission');
        const permission = await query.getMany();
        return permission;
    }
}