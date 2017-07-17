export class AlbumModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  cover_url: string;
  image: string;
  cover_capa: string;
  title: string;
  url: string;
  user_id: number;

    constructor(public params?:any) {
        params = params || {}
        this.id = params.id || null;
        this.createdAt = params.createdAt || "";
        this.updatedAt = params.updatedAt || "";
        this.cover_url = params.cover_url || "";
        this.cover_capa = params.cover_url || "";
        this.image = params.cover_url || "";        
        this.title = params.title || "";
        this.user_id = params.user_id || null;
    }
}