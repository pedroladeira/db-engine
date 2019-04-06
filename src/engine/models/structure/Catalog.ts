import { Schema } from '.';

export default class Catalog {
  private name: string;
  private schemas: Schema[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public addSchema(schema: Schema): void {
    this.schemas.push(schema);
  }

  public getSchemas(): Schema[] {
    return this.schemas;
  }
}
