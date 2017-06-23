export class AdvertiserModel{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  document_type: number;
  document_number: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  landline: string;
  cell_phone: string;
  user_id: number;
  address: any;
  ads: any;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;
    this.document_type = params.document_type || 0;
    this.document_number = params.document_number || "";
    this.email = params.email || "";
    this.website = params.website || "";
    this.facebook = params.facebook || "";
    this.instagram = params.instagram || "";
    this.landline = params.landline || "";
    this.cell_phone = params.cell_phone || "";
    this.user_id = params.user_id || null;
    this.address = params.address || null;
    this.ads = params.ads || null;
  }
}
