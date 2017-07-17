export class CommentableModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.description = params.description || "";
  }
}
