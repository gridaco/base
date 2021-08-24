import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { env } from "process";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class ApiJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authservice: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET_KEY,
    });
  }
  async validate(payload: any) {
    const user = this.authservice.verify(payload);
    if (!user) {
      throw new UnauthorizedException("Invalid token");
    }
    return user;
  }
}
