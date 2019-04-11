import { Table } from '.';

export default class Schema {
    public name: string;
    public catalogName: string;
    public tables: Table[] = [];

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

    public toJson(): any {
        return {
            name: this.name,
            schemas: this.tables.map((t: Table) => t.toJson()),
        }
    }
}
