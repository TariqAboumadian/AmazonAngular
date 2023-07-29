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
  isCheck:boolean=false;
  numOfItems:number=0;
  totalPrice:number=0;
  constructor(private cartItemService:CartItemService,private cookiesService:CookieService,
    private orderService:OrderService,private router:Router){
    this.numbers = [...Array(10).keys()].map(i => i + 1);
  }
  ngOnInit(): void {
    this.ShowItemCart();
    const len= this.cartItemService.getCartItems().length;
    if(len>0)
    {
    this.isCheck=true
    }
    this.numOfitemCart();
}

  ShowItemCart(){
    this.products= this.cartItemService.getCartItems();
    this.cookiesService.set('counter', JSON.stringify(this.cartItemService.getCartItems().length));
    for (var i=0;i<this.products.length;i++) {
      this.selectedOption[i]=this.products[i].Qty;
    }
  }
  numOfitemCart(){
    this.numOfItems=0;
    this.totalPrice=0;
    var productList= this.cartItemService.getCartItems();
    for (var i=0;i<productList.length;i++) {
      this.numOfItems+=Number(productList[i].Qty);
      this.totalPrice+=productList[i].price * productList[i].Qty;
    }
  }


  updateItem(itemId:number,qty:number){
    this.cartItemService.updateCartItem(itemId,qty);
    this.numOfitemCart();
  }

  removeItem(itemId?:number){
    this.cartItemService.removeFromCart(itemId);
    this.ShowItemCart();
    this.isCheck=false;
    this.numOfitemCart();
  }
 

}
