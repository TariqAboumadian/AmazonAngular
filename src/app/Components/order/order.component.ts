import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderItem: IOrderItem = {} as IOrderItem;
  order: IOrder = {} as IOrder;
  order1: IOrder = {} as IOrder;
  orders: IOrder[] = [];
  total: number = 0;
  constructor(
    private cartItemService: CartItemService,
    private orderItemService: OrderItemService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private cookieservice: CookieService,
    private router: Router,

  ) {}



  ngOnInit(): void {
    this.setOrderIdByparam();
    this.getOrders();
    this.orders;
    console.log(this.total);
  }

  setOrderIdByparam() {
    this.orderItem.orderId = this.activatedRoute.snapshot.paramMap.get(
      'orderId'
    )
      ? Number(this.activatedRoute.snapshot.paramMap.get('orderId'))
      : 0;
  }
  convertProductToOrderItem(product: IProduct): IOrderItem {
    this.orderItem.productId = product.id;
    this.orderItem.productname = product.name;
    this.orderItem.arabicProductname = product.arabicName;
    this.orderItem.imgUrl = product.images[0];
    this.orderItem.count = product.Qty;
    this.orderItem.productPrice = product.price;
    this.orderItem.supTotalPrice=product.price*product.Qty;
    return this.orderItem;
  }

  addOrderItems() {
    const items = this.cartItemService.getCartItems();
    console.log(items);

    for (const item of items) {
        this.orderItemService.addOrderItem(this.convertProductToOrderItem(item)).
        subscribe();
        }
    this.cartItemService.clearCart();
  }
  getOrders() {
    if (this.orderItem.orderId !== 0) {
      this.addOrderItems();
      const id = sessionStorage.getItem('userid');
      if (id != null) {
        this.orderService.GetAllOrdersByUserId(id).subscribe((data: any) => {
          this.orders = data;
        });
      }
    } else {
      const id = sessionStorage.getItem('userid');
      if (id != null) {
        this.orderService.GetAllOrdersByUserId(id).subscribe((data: any) => {
          this.orders = data;
        });
      }
    }

  }
  trackPackage(id: number) {
    this.router.navigate(['/tracking', id]);
  }
  cancleOrder(id: number) {
     this.orderService.GetOrderById(id).subscribe((data:IOrder) => {this.order=data});
    if (this.order.status < 2) {
      this.orderService.DeleteOrder(id).subscribe((data:IOrder) =>
      {

      }
      );
    }

  }

}
