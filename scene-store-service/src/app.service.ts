import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return "Welcome to Grida scene-store service. Learn more at https://grida.co";
  }
}
