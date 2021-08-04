import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './User.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport'

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret: 'SolisSecret',
            signOptions: {
                expiresIn: 3600,
            }
        }),
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [JwtStrategy, PassportModule]
})
export class UserModule { }
