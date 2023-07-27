import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/Models/iorder';
import { IProduct } from 'src/app/Models/iproduct';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products:IProduct[]|undefined;
  Order:IOrder={} as IOrder;
  numbers:number[]=[];
  selectedOption:number[]=[];
  constructor(private cartItemService:CartItemService,private cookiesService:CookieService,
    private orderService:OrderService,private router:Router){
    this.numbers = [...Array(10).keys()].map(i => i + 1);
  }
  ngOnInit(): void {
    this.ShowItemCart();
  }

  ShowItemCart(){
    this.products= this.cartItemService.getCartItems();
    this.cookiesService.set('counter', JSON.stringify(this.cartItemService.getCartItems().length));
    for (var i=0;i<this.products.length;i++) {
      this.selectedOption[i]=this.products[i].Qty;
    }
  }

  updateItem(itemId:number,qty:number){
    this.cartItemService.updateCartItem(itemId,qty);
  }

  removeItem(itemId?:number){
    this.cartItemService.removeFromCart(itemId);
    this.ShowItemCart();
  }
 

}
