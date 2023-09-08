import { Cat } from "../entities/cat.entity";

export class CatsRepository {
  cats: Cat[] = [
    {
      id: 1,
      name: 'Cat 1',
      age: 1,
      breed: 'Breed 1',
    },
    {
      id: 2,
      name: 'Cat 2',
      age: 2,
      breed: 'Breed 2',
    },
    {
      id: 3,
      name: 'Cat 3',
      age: 3,
      breed: 'Breed 3',
    },
    {
      id: 4,
      name: 'Cat 4',
      age: 4,
      breed: 'Breed 4',
    },
    {
      id: 5,
      name: 'Cat 5',
      age: 5,
      breed: 'Breed 5',
    },
  ];

  getList() {
    return this.cats;
  }
}