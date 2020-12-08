import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to bridged hosting service. Learn more at https://github.com/bridgedxyz/services/';
  }


  createKey() {

  }

  deleteKey() {

  }

  udateKeyName() {

  }

  registerVariant() {

  }

  removeVariant() {

  }
}
