export class User {
  constructor(
    private email: string,
    private id: string,
    private _token: string,
    private _expirationDate: Date
  ) {
  }

  get token() {
    return this._token;
  }

}
