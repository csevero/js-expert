import { randomUUID as uuid } from 'crypto';

export default class Cart {
  constructor() {
    this.at = uuid();
  }
}
