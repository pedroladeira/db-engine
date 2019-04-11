import { Schema } from '.';

export default class Catalog {
    public name: string;
    public schemas: Schema[] = [];

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

    public toJson(): any {
        return {
            name: this.name,
            schemas: this.schemas.map((s: Schema) => s.toJson()),
        }
    }
}
