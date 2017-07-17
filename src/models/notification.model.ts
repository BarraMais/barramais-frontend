export class NotificationModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  user_id: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.user_id = params.user_id || "";
  }
}
