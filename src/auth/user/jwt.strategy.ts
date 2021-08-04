import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "../jwt-payload-interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        @InjectRepository(UserRepository)
        private userRepositor: UserRepository,
    ) {

        super({
            secretOrKey: 'SolisSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    //this is run after we know the token is valid
    async validate(payload: JwtPayload): Promise<User> {
        const username = payload.user.username
        const user: User = await this.userRepositor.findOne({ username })

        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}