export class AlbumModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  cover_photo: string;
  name: string;
  url: string;

    constructor(public params?:any) {
        params = params || {}
        this.id = params.id || null;
        this.createdAt = params.createdAt || "";
        this.updatedAt = params.updatedAt || "";
        this.cover_photo = params.cover_photo || "";
        this.url = params.url || "";
    }
}