import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: 'string'

    @MinLength(8)
    @MaxLength(20)
    @IsNotEmpty()
    //second argument is error handler message
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak'
    })
    password: 'string'
}