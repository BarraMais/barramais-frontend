export class GroupModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Group informartion
  user_id: number;
  name: string;
  about: string;
  cover_photo: string;
  cover_photo_url: string;
  admin: any;

  constructor(public params?:any) {
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;

    this.user_id = params.user_id || 0;
    this.name = params.name || null;
    this.about = params.about || null;
    this.cover_photo = params.cover_photo || null;
    this.cover_photo_url = params.cover_photo_url || null;
    this.admin = params.admin || {};
  }
}
