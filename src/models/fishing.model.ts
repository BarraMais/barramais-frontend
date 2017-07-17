export class FishingModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
  classified_id: number;
  fishing_category_id: number;
  fishing_sub_category_id: number;
  provisional_category: string;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.status = params.status || 0;
    this.fishing_category_id = params.fishing_category_id || null;
    this.fishing_sub_category_id = params.fishing_sub_category_id || null;
    this.provisional_category = params.provisional_category || "";
  }
}
