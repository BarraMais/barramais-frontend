export class AdModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  photo: string;
  photo_url: string;
  area: number;
  interest_areas: any;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.description = params.description || "";
    this.photo = params.photo || "";
    this.photo_url = params.photo_url || "";
    this.area = params.area || null;
    this.interest_areas = params.interest_areas || null;
  }
}
