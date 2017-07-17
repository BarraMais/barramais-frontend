export class AddressModel {

  street: string;
  complement: string;
  neighborhood: string;
  city_id: number;
  state_id: number;
  country_id: number;
  zip_code: string;

  constructor(public params?:any) {
    params = params || {}
    this.street = params.street || "";
    this.complement = params.complement || "";
    this.neighborhood = params.neighborhood || "";
    this.city_id = params.city_id || null;
    this.country_id = params.country_id || 1;
    this.state_id = params.state_id || null;
    this.zip_code = params.zip_code || "";
  }

}
