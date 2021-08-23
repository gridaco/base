import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";
import { PrismaModule } from "../_prisma/prisma.module";
import { PrismaService } from "../_prisma/prisma.service";
import { AuthenticationService } from "./authentication.service";
import { ApiJwtStrategy } from "./api-jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
    }),
  ],
  providers: [PrismaService, AuthenticationService, ApiJwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {
  constructor() {}
}
