export class AccessoryModel {
  id: number;
  accessory_type: number;
  name: string;
  classified_id: number;
  vessel_id: number;
  createdAt: Date;
  updatedAt: Date;
  accessory_price: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.accessory_type = params.accessory_type || 0;
    this.name = params.name || "";
    this.classified_id = params.classified_id || null;
    this.vessel_id = params.vessel_id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.accessory_price = params.accessory_price || 0;
  }
}
