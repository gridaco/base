import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { env } from "process";
import { ExtractJwt, Strategy } from "passport-jwt";
import { verify } from "../_auth/verification-api";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class ApiJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET_KEY,
    });
  }
  async validate(payload: any) {
    try {
      if (payload && Date.now() / 1000 < payload.exp) {
        const token = this.jwtService.sign(payload);
        const verified = await verify(token);
        if (verified) {
          // user object
          return {
            id: payload.id,
            email: payload.email,
            username: payload.username,
          };
        }
      }
      console.log("pload", payload, Date.now() / 1000);
    } catch (_) {
      console.log("failed auth", _);
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
