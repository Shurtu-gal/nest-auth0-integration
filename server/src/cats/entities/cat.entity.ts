import { randomUUID } from 'crypto';

export class Cat {
  id: number;
  name: string;
  age: number;
  breed: string;

  constructor(partial: Partial<Cat>) {
    Object.assign(this, partial);

    this.id = parseInt(randomUUID().split('-')[0]);
  }
}
