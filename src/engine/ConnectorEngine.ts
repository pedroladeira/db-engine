import ActiveConnection from './models/ActiveConnection';
import { POSTGRESQL } from './models/DriverTypes';
import DriverPostgreSQL from './drivers/postgresql';
import { Catalog } from './models/structure';

export default class ConnectorEngine {
  public activeConnection: ActiveConnection = new ActiveConnection();

  public connect(type: string, host: string, user: string, pass: string, port: number, database: string): Promise<any> {
    const self = this;
    return new Promise<any>((resolve: any, reject: any) => {
      if (type == POSTGRESQL) {
        const con: DriverPostgreSQL = new DriverPostgreSQL();
        con.connect(host, user, pass, port, database).then(() => {
          self.activeConnection.setDriver(con);
          self.getStructure().then((catalogs: Catalog[]) => {
            resolve(catalogs);
          });
        });
      } else {
        reject();
      }
    });
  }

  public getStructure(): Promise<Catalog[]> {
    const self = this;
    return new Promise<Catalog[]>((resolve: any, reject: any) => {
      if (self.activeConnection) {
        return self.activeConnection
          .getDriver()
          .getStructure()
          .then((catalogs: Catalog[]) => {
            resolve(catalogs);
          });
      } else {
        reject();
      }
    });
  }
}
