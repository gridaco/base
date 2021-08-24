import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "../_auth/verification-api";
import { totp } from "otplib";

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async verify(payload) {
    switch (payload?.type) {
      case "human-user":
        return this.verifyHumanUser(payload);
      case "human-user/s2s-otp":
        return this.verifyHumanUserS2SOtp(payload);
    }
    throw new UnauthorizedException();
  }

  private async verifyHumanUser(payload) {
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
  }

  private async verifyHumanUserS2SOtp(payload) {
    const verified = totp.verify({
      token: payload.otp,
      secret: process.env.S2S_OTP_SECRET,
    });

    if (verified) {
      // user object
      return {
        id: payload.id,
        email: payload.email,
        username: payload.username,
      };
    }
  }
}
