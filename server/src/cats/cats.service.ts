import { Injectable } from '@nestjs/common';
import { Observable, concatMap, interval, of, take } from 'rxjs';
import { CatsRepository } from './repository/cats.repository';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepo: CatsRepository) {}

  getList() {
    return this.catsRepo.getList();
  }

  getOneByOne(): Observable<any> {
    return interval(1000).pipe(
      take(this.catsRepo.getList().length),
      concatMap((index) => {
        const cat = this.catsRepo.getList()[index];
        return of(cat);
      }),
    );
  }

  getById(id: number) {
    return this.catsRepo.getList().find((cat) => cat.id === id);
  }

  create(cat: CreateCatDto) {
    const newCat = new Cat(cat);

    this.catsRepo.getList().push(newCat);

    return {
      message: 'Cat has been created successfully',
    };
  }

  update(id: number, cat) {
    const index = this.catsRepo.getList().findIndex((cat) => cat.id === id);
    this.catsRepo.getList()[index] = cat;
  }

  delete(id: number) {
    const index = this.catsRepo.getList().findIndex((cat) => cat.id === id);
    this.catsRepo.getList().splice(index, 1);
  }

  getByCharacteristics(characteristics: string, value: string) {
    return this.catsRepo
      .getList()
      .filter((cat) => cat[characteristics].toString() === value);
  }
}
