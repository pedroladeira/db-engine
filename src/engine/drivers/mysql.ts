import * as MySQLClient from 'mysql';
import AbstractDriver from '../models/AbstractDriver';
import { Catalog, Schema, Table } from '../models/structure';

export default class DriverMySQL extends AbstractDriver {
  private client: any;

  public connect(host: string, user: string, pass: string, port: number, database: string): Promise<any> {
    const self = this;
    self.client.createConnection({
      host: host,
      user: user,
      password: pass,
      database: database,
      port: port,
    });
    return new Promise<any>((resolve: any, reject: any) => {
      self.client.connect((err: any) => {
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
        'SELECT catalog_name as name FROM information_schema.information_schema_catalog_name;',
        (err: any, res: any) => {
          resolve(res.rows.map((e: any) => new Catalog(e.name)));
        },
      );
    });
  }

  protected getSchemasInformation(): Promise<Schema[]> {
    const self = this;
    return new Promise<any>((resolve: any, reject: any) => {
      self.client.query('select catalog_name, schema_name from information_schema.schemata;', (err: any, res: any) => {
        resolve(res.rows.map((e: any) => new Schema(e.schema_name, e.catalog_name)));
      });
    });
  }

  protected getTablesInformation(): Promise<Table[]> {
    const self = this;
    return new Promise<any>((resolve: any, reject: any) => {
      self.client.query('select table_schema, table_name from information_schema.tables;', (err: any, res: any) => {
        resolve(res.rows.map((e: any) => new Table(e.table_name, e.table_schema)));
      });
    });
  }
}
