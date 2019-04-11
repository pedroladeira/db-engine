export default class Table {
    public name: string;
    public schemaName: string;

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

    public toJson(): any {
        return {
            name: this.name,
        }
    }
}
