import { Table } from '.';

export default class Schema {
  private name: string;
  private catalogName: string;
  private tables: Table[] = [];

  constructor(name: string, catalogName: string) {
    this.name = name;
    this.catalogName = catalogName;
  }

  public getName(): string {
    return this.name;
  }

  public getCatalogName(): string {
    return this.catalogName;
  }

  public addTable(table: Table): void {
    this.tables.push(table);
  }

  public getTables(): Table[] {
    return this.tables;
  }
}
