export class VesselModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
  manufacturation_year: string;
  activation_year: string;
  alienated: boolean;
  chassis_number: string;
  classified_id: number;
  mold_id: number;
  brand_id: number;
  vessel_type_id: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.status = params.status || 0;
    this.manufacturation_year = params.manufacturation_year || "";
    this.activation_year = params.activation_year || "";
    this.alienated = params.alienated || 0;
    this.chassis_number = params.chassis_number || "";
    this.classified_id = params.classified_id || null;
    this.mold_id = params.mold_id || null;
    this.brand_id = params.brand_id || null;
    this.vessel_type_id = params.vessel_type_id || null;
  }
}
