import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { CatsService } from "./cats.service";
// import { Request } from "express";
import { Observable } from "rxjs";
import { CreateCatDto } from "./dto/create-cat.dto";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getListOfCats() {
    return this.catsService.getList();
  }

  @Get('/one-by-one')
  getOneByOne(): Observable<any> {
    return this.catsService.getOneByOne();
  }

  @Get('/:id')
  getCatById(@Param() param: { id: string}) {
    return this.catsService.getById(+param.id);
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
};