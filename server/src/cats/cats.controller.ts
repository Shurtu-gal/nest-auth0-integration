import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
// import { Request } from "express";
import { Observable } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from '../utils/exception/http-exception.filter';
import { TransformInterceptor } from '../utils/interceptor/transformer.interceptor';

@Controller('cats')
@UseInterceptors(TransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getListOfCats(@Query() queryParams: { page: string; perPage: string, sort: string[], filter: string }) {
    return this.catsService.getList(queryParams);
  }

  @Get('/one-by-one')
  getOneByOne(): Observable<any> {
    return this.catsService.getOneByOne();
  }

  @Get('/:id')
  getCatById(@Param() param: { id: string }) {
    return this.catsService.getById(param.id);
  }

  @Get('/breeds/:breed')
  getCatsByBreed(@Param('breed') breed: string) {
    return this.catsService.getByCharacteristics('breed', breed);
  }

  @Get('/ages/:age')
  getCatsByAge(@Param('age') age: string) {
    return this.catsService.getByCharacteristics('age', age);
  }

  // @Post()
  // @HttpCode(201)
  // createCat(@Req() req: Request) {
  //   return this.catsService.create(req.body);
  // }
  @Post()
  @HttpCode(201)
  createCat(@Body() cat: CreateCatDto) {
    return this.catsService.create(cat);
  }

  @Post('/filter')
  @HttpCode(201)
  @UseFilters(HttpExceptionFilter) // Enable Dependency Injection
  createCatWithFilter() {
    throw new ForbiddenException();
  }

  @Delete('/:id')
  deleteCat(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
