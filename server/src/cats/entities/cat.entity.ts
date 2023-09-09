import { randomUUID } from 'crypto';

export class Cat {
  id: string;
  name: string;
  age: number;
  breed: string;

  constructor(partial: Partial<Cat>) {
    Object.assign(this, partial);

    // Create a random id as mongo does if not provided
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
