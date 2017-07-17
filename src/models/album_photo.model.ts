export class AlbumPhotoModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
  url: string;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.photo = params.photo || "";
    this.url = params.url || "";
  }
}
