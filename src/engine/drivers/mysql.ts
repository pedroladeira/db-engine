import * as MySQLClient from 'mysql';
import AbstractDriver from '../models/AbstractDriver';
import { Catalog, Schema, Table } from '../models/structure';

export default class DriverMySQL extends AbstractDriver {
    private client: any;

    public connect(
        host: string,
        user: string,
        pass: string,
        port: number,
        database: string
    ): Promise<any> {
        const self = this;
        self.client = MySQLClient.createConnection({
            host,
            user,
            password: pass,
            database,
            port
        });
        return new Promise<any>((resolve: any, reject: any) => {
            self.client.connect((err: any) => {
                console.log('MYSQL2', err);
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    protected getCatalogsInformation(): Promise<Catalog[]> {
        const self = this;
        return new Promise<any>((resolve: any, reject: any) => {
            self.client.query(
                'select catalog_name from information_schema.schemata group by catalog_name;',
                (err: any, res: any) => {
                    resolve(res.map((e: any) => new Catalog(e.catalog_name)));
                }
            );
        });
    }

    protected getSchemasInformation(): Promise<Schema[]> {
        const self = this;
        return new Promise<any>((resolve: any, reject: any) => {
            self.client.query(
                'select catalog_name, schema_name from information_schema.schemata;',
                (err: any, res: any) => {
                    resolve(
                        res.map(
                            (e: any) =>
                                new Schema(e.schema_name, e.catalog_name)
                        )
                    );
                }
            );
        });
    }

    protected getTablesInformation(): Promise<Table[]> {
        const self = this;
        return new Promise<any>((resolve: any, reject: any) => {
            self.client.query(
                'select table_schema, table_name from information_schema.tables;',
                (err: any, res: any) => {
                    resolve(
                        res.map(
                            (e: any) => new Table(e.table_name, e.table_schema)
                        )
                    );
                }
            );
        });
    }

    public closeConnection(): void {
        if (this.client) {
            this.client.destroy();
        }
    }

    public destroyConnection(): void {
        if (this.client) {
            this.client.destroy();
        }
    }    

    public query(q: string): Promise<any> {
        const self = this;
        return new Promise<any>((resolve: any, reject: any) => {
            self.client.query(q,
                (err: any, res: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                }
            );
        });
    }
}
