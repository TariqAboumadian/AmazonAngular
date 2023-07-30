import { IOrderItem } from "./iorder-item";

export interface IOrder {
  id :number;
  status:number;
  orderDate :Date;
  arrivalDate :Date;
  userId:string;
  orderItems:IOrderItem[];
}
