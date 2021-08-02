import { IsNotEmpty, IsNumber } from "class-validator"

export class AssignPermissionToRoleDto {
    @IsNotEmpty()
    @IsNumber()
    permissionId: number

    @IsNotEmpty()
    @IsNumber()
    roleId: number
}