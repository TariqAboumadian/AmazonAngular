import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/Models/iorder';
import { IOrderItem } from 'src/app/Models/iorder-item';
import { IProduct } from 'src/app/Models/iproduct';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { OrderItemService } from 'src/app/Services/order-item.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  orderItem:IOrderItem={} as IOrderItem;
  orders:IOrder[]=[];
  constructor(private cartItemService:CartItemService,private orderItemService:OrderItemService,
    private orderService:OrderService,
    private activatedRoute:ActivatedRoute,
    private cookieservice :CookieService){}

  ngOnInit(): void {
    this.setOrderIdByparam();
    this.getOrders();
    this.orders;
}

setOrderIdByparam()
{
  this.orderItem.orderId = this.activatedRoute.snapshot.paramMap.get("orderId")?
  Number(this.activatedRoute.snapshot.paramMap.get("orderId")):0;

}
  convertProductToOrderItem(product:IProduct):IOrderItem{
    this.orderItem.productId=product.id;
    this.orderItem.productname=product.name;
    this.orderItem.arabicProductname=product.arabicName;
    this.orderItem.imgUrl=product.images[0];
    this.orderItem.count=product.Qty;
    this.orderItem.productPrice=product.price;
    return this.orderItem;
  }
  addOrderItems()
  {
    const items= this.cartItemService.getCartItems();
    for (const item of items) {
        this.orderItemService.addOrderItem(this.convertProductToOrderItem(item)).
        subscribe();
        }
    this.cartItemService.clearCart();
  }
  getOrders()
  {

 if(this.orderItem.orderId !==0)
 {
    this.addOrderItems();
    const id=sessionStorage.getItem('userid')
    if(id!=null)
    {
    this.orderService.GetAllOrdersByUserId(id).
    subscribe(
      (data:any) =>
      {
        this.orders=data;
      });
  }
}
  else{
    const id=sessionStorage.getItem('userid')
    if(id!=null)
    {
    this.orderService.GetAllOrdersByUserId(id).
    subscribe(
      (data:any) =>
      {
        this.orders=data;
      });
    }
  }
 }
}


