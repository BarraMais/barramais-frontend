export class StateModel {

  name: string;
  uf: string;
  country_id: string;

  constructor(public params?:any) {
    params = params || {}
    this.name = params.name || "";
    this.uf = params.code || "";
    this.country_id = params.country_id || "";
  }

}
