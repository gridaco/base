import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../_prisma/prisma.service";
import { PrismaModule } from "../_prisma/prisma.module";
import { ScenesController } from "./scenes.controller";
import { ScenesService } from "./scenes.service";
import { env } from "process";
import { ApiJwtStrategy } from "../authentication/api-jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [ScenesController],
  providers: [ScenesService, PrismaService, ApiJwtStrategy],
})
export class ScenesModule {}
