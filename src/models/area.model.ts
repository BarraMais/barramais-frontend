export class AreaModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  ad_id: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.name = params.name || "";
    this.price = params.price || 0;
    this.ad_id = params.ad_id || null;
  }
}
