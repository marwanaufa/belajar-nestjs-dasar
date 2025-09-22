import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // Unit test fungsi yang menggunakan decorator dari nestjs langsung
  it('should can say hello', async () => {
    const response = await controller.sayHello('Marwan', 'Aufa');
    expect(response).toBe('Hello Marwan Aufa');
  });

  // Unit test fungsi yang menggunakan response atau request dari express
  it('should can view template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Marwan', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Marwan',
      title: 'Template Engine',
    });
  });
});

/**
 * Unit Test
 * Saran penggunaan decorator dalam membuat fungsi akan mempengaruhi ke pembuatan unit test
 * Ketika menggunakan response atau request dari express kita akan bingung parameter apa yang harus dimasukan ke
 * req atau res tersebut.
 * Namun ini bisa diatasi dengan menggunakna Object Mock, atau node-mock-http
 */
