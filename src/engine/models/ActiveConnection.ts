export default class ActiveConnection {
  private driver: any = null;

  public setDriver(con: any) {
    this.driver = con;
  }

  public getDriver(): any {
    return this.driver;
  }

  public isValid(): boolean {
    return this.driver != null;
  }
}
