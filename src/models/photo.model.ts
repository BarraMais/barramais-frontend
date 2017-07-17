export class PhotoModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  filename: string;
  image: string;
  original_filename: string;

    constructor(public params?:any) {
        params = params || {}
        //this.id = params.id || null;
        //this.createdAt = params.createdAt || "";
        //this.updatedAt = params.updatedAt || "";
        //this.url = params.cover_url || "";
        this.image = params.cover_url || "";
        //this.filename = params.filename || "";
        this.original_filename = params.original_filename || "";
    }
}