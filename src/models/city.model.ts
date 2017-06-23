export class CityModel {

  name: string;
  state_id: string;

  constructor(public params?:any) {
    params = params || {}
    this.name = params.name || "";
    this.state_id = params.state_id || "";
  }

}
