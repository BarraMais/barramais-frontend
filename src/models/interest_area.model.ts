export class InterestAreaModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  photo_url: string;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.name = params.name || "";
    this.photo_url = params.photo_url || "";
  }
}
