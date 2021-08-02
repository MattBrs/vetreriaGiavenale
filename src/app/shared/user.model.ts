export class User {
  constructor(
    public email: string,
    public id: string,
    public _token: string,
    private _expirationDate: Date
  ) {
  }

  get expirationDate() {
    return this._expirationDate;
  }
  get token() {
    if(this.expirationDate <= new Date()){
      return '';
    }
    return this._token;
  }

}
