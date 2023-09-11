import { Injectable } from '@nestjs/common';
import { Observable, concatMap, interval, of, take } from 'rxjs';
import { CatsRepository } from './repository/cats.repository';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepo: CatsRepository) {}

  getList(queryParams: {
    page: string | null;
    perPage: string | null;
    sort: string[] | null;
    filter: string | null;
  }) {
    const list = this.catsRepo.getList();
    const { page, perPage, sort } = queryParams;
    const start = page ? (parseInt(page) - 1) * parseInt(perPage) : 0;
    const end = perPage ? start + parseInt(perPage) : list.length;
    // Sort is of the form ['id,ASC', 'name,DESC']
    const sortedList = sort
      ? list.sort((a, b) => {
          for (const sortField of sort) {
            const [field, order] = sortField.split(',');
            if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
            if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
          }
          return 0;
        })
      : list;

    return {
      data: sortedList.slice(start, end),
      total: list.length,
      pageInfo: {
        hasNextPage: end < list.length,
        hasPreviousPage: start > 0,
      },
    };
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

  getById(id: string) {
    return this.catsRepo.getList().find((cat) => cat.id === id);
  }

  create(cat: CreateCatDto) {
    const newCat = new Cat(cat);

    this.catsRepo.getList().push(newCat);

    return newCat;
  }

  update(id: string, cat: UpdateCatDto) {
    const index = this.catsRepo.getList().findIndex((cat) => cat.id === id);
    this.catsRepo.getList()[index] = {
      ...this.catsRepo.getList()[index],
      ...cat,
    };
    return this.catsRepo.getList()[index];
  }

  delete(id: string) {
    const index = this.catsRepo.getList().findIndex((cat) => cat.id === id);
    return this.catsRepo.getList().splice(index, 1);
  }

  getByCharacteristics(characteristics: string, value: string) {
    return this.catsRepo
      .getList()
      .filter((cat) => cat[characteristics].toString() === value);
  }
}
