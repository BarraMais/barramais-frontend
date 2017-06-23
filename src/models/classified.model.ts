export class ClassifiedModel {
  id: number;
  bonded: boolean;
  title: string;
  document_type: number;
  document_number: string;
  seller_name: string;
  email: string;
  landline: string;
  cell_phone: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
  photo_url: string;
  user_id: number;
  classified_conditional: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.bonded = params.bonded || false;
    this.title = params.title || "";
    this.document_type = params.document_type || 0;
    this.document_number = params.document_number || "";
    this.seller_name = params.seller_name || "";
    this.email = params.email || "";
    this.landline = params.landline || "";
    this.cell_phone = params.cell_phone || "";
    this.description = params.description || "";
    this.price = params.price || 0;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || 0;
    this.photo = params.photo || "";
    this.photo_url = params.photo_url || "";
    this.user_id = params.user_id || null;
    this.classified_conditional = params.classified_conditional || null;
  }
}
