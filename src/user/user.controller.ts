import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Redirect,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/users')
export class UserController {
  // Asynchronous
  @Get('/hello')
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    return `Hello ${firstName} ${lastName}`;
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample')
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
  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }

  // Set cookie menggunakan query
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  // Get cookie
  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  // Response menggunakan Response Decorator (yang direkomendasikan)
  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  // Get by Id menggunakan Request Decorator (yang direkomendasikan)
  @Get(':id')
  getById(@Param('id') id: string): string {
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
