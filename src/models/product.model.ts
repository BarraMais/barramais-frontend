export class ProductModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
  product_category_id: number;
  product_sub_category_id: number;
  product_sub_category2_id: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.status = params.status || 0;
    this.product_category_id = params.product_category_id || null;
    this.product_sub_category_id = params.product_sub_category_id || null;
    this.product_sub_category2_id = params.product_sub_category2_id || null;
  }
}
