export class CountryModel {

  name: string;
  code: string;

  constructor(public params?:any) {
    params = params || {}
    this.name = params.name || "";
    this.code = params.code || "";
  }

}
