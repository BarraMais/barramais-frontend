export class PhotoModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  filename: string;


    constructor(public params?:any) {
        params = params || {}
        this.id = params.id || null;
        this.createdAt = params.createdAt || "";
        this.updatedAt = params.updatedAt || "";
        this.url = params.cover_url || "";
        this.filename = params.filename || "";
    }
}