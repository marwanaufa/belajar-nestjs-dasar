import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello(name: string): string {
    return `Hello ${name}`;
  }
}

/**
 * Provider
 * menggunakan decorator @Injectable() dan harus diimport ke module nya agar diload
 */
