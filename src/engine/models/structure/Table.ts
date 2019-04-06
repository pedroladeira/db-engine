export default class Table {
  private name: string;
  private schemaName: string;

  constructor(name: string, schemaName: string) {
    this.name = name;
    this.schemaName = schemaName;
  }

  public getName(): string {
    return this.name;
  }

  public getSchemaName(): string {
    return this.schemaName;
  }
}
