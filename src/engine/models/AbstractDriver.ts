import { Catalog, Schema, Table } from './structure';

export default class AbstractDriver {
  public connect(host: string, user: string, pass: string, port: number, database: string): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      reject();
    });
  }

  public getStructure(): Promise<Catalog[]> {
    const self = this;
    return new Promise<any>((resolve: any, reject: any) => {
      const result: Catalog[] = [];
      self.getCatalogsInformation().then((catalogs: Catalog[]) => {
        result.push.apply(result, catalogs);
        // fetch schemas
        self.getSchemasInformation().then((schemas: Schema[]) => {
          // fetch tables
          self.getTablesInformation().then((tables: Table[]) => {
            tables.forEach((t: Table) => {
              const finded = schemas.find((e: Schema) => e.getName() === t.getSchemaName());
              if (finded) {
                finded.addTable(t);
              }
            });
            schemas.forEach((s: Schema) => {
              const finded = result.find((e: Catalog) => e.getName() === s.getCatalogName());
              if (finded) {
                finded.addSchema(s);
              }
            });
          });
        });
        resolve(result);
      });
    });
  }

  protected getCatalogsInformation(): Promise<Catalog[]> {
    return new Promise<Catalog[]>(() => {});
  }

  protected getSchemasInformation(): Promise<Schema[]> {
    return new Promise<any>(() => {});
  }

  protected getTablesInformation(): Promise<Table[]> {
    return new Promise<any>(() => {});
  }
}
