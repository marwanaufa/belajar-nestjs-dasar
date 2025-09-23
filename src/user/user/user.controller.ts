import * as common from '@nestjs/common';
import express from 'express';
import { UserService } from './user.service';

@common.Controller('/api/users')
export class UserController {
  // Property Based Injection (Tidak direkomendasi)
  @common.Inject()
  @common.Optional()
  private userService: UserService;

  // Dependency Inject menggunakan Constructor (Rekomendasi)
  constructor(private service: UserService) {}

  // Asynchronous
  @common.Get('/hello')
  async sayHello(@common.Query('name') name: string): Promise<string> {
    // Penggunaan service yang diinject
    return this.userService.sayHello(name);
  }

  @common.Post()
  post(): string {
    return 'POST';
  }

  @common.Get('/sample')
  get(): string {
    return 'Hello NestJS';
  }

  // Menggunakan object Request dari expres, tidak disarankan
  //   @Get(':id')
  //   getById(@Req() request: Request): string {
  //     return `GET ${request.params.id}`;
  //   }

  // Response menggunakan Response dari express, tidak disarankan
  //   @Get('/sample-response')
  //   sampleResponse(@Res() response: Response) {
  //     response.status(200).json({
  //       data: 'Hello World',
  //     });
  //   }

  // View
  @common.Get('/view/hello')
  viewHello(
    @common.Query('name') name: string,
    @common.Res() response: express.Response,
  ) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }

  // Set cookie menggunakan query
  @common.Get('/set-cookie')
  setCookie(
    @common.Query('name') name: string,
    @common.Res() response: express.Response,
  ) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  // Get cookie
  @common.Get('/get-cookie')
  getCookie(@common.Req() request: express.Request): string {
    return request.cookies['name'];
  }

  // Response menggunakan Response Decorator (yang direkomendasikan)
  @common.Get('/sample-response')
  @common.Header('Content-Type', 'application/json')
  @common.HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON',
    };
  }

  @common.Get('/redirect')
  @common.Redirect()
  redirect(): common.HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  // Get by Id menggunakan Request Decorator (yang direkomendasikan)
  @common.Get(':id')
  getById(@common.Param('id') id: string): string {
    return `GET ${id}`;
  }
}

/**
 * Decorator di Nest
 * @Get(path) untuk HTTP Get
 * @Post(path) untuk HTTP Post
 * @Put(path) untuk HTTP Put
 * @Delete(path) untuk HTTP Delete
 * @Patch(path) untuk HTTP Patch
 * @Head(path) untuk HTTP Head
 * @Options(path) untuk HTTP Option
 * @All(path) untuk HTTP Method
 */

/**
 * Request Decorator
 * @Req() untuk express.Request
 * @Param(key?) untuk req.params.key?
 * @Body(key?) untuk req.body.key?
 * @Query(key?) untuk req.query.key?
 * @Header(key?) untuk req.headers.key?
 * @Ip() untuk req.ip
 * @HostParam() untuk req.host
 */

/**
 * Response Decorator
 * @HttpCode(code) untuk mengubah response status code
 * @Header(key, value) untuk mengubah response header
 * @Redirect(location, code) untuk melakukan redirect, lokasi redirect bisa diubah dengan mengembalikan data
 * HttpRedirectResponse pada methodnya
 * @Next() untuk express.NextFunction
 */

/**
 * Cookie
 * Menggunakan cookieParser dari express
 * Karena cookieParser merupakan plugin dari express, mau tidak mau kita harus menggunakan Request atau Response
 * dari express juga, tidak menggunakan Request atau Response Decorator
 */

/**
 * Dependency Injection
 * Adalah kondisi jika object membutuhkan object lain
 * Misal UserController membutuhkan UserService
 * Semua module, controller dan provider akan dibuat sebagai singleton object secara otomatis oleh NestJS
 * Misal kita punya banyak controller dan butuh UserService semua, maka kita cukup membuat satu UserService dan diinject ke semua controller yang membutuhkan
 */

/**
 * Property-based Inejction
 * Secara default, NestJS akan menggunakan constructor parameter untuk melakukan injection
 * Tapi mendukung untuk melakukan inject property nya
 * Yaitu dengan memberikan decorator @Inject() pada propertynya
 */

/**
 * Optional Dependency
 * Secara default dependency yang dibutuhkan wajib diisi, jika tidak ada akan dianggap error
 * Namun jika dependency nya bersifat opsional atau tidak wajib, bisa menambahkan decorator @Optional() di tempat atau dependency yang tidak wajib
 * Maka nest tidak akan menganggap error
 */
