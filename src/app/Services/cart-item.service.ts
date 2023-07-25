import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IProduct } from '../Models/iproduct';
import { OrderService } from './order.service';
import { IOrder } from '../Models/iorder';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  userid: string="";
  cartItems: IProduct[] = [];
 flag:Boolean=false;
 constructor(private cookieService: CookieService ) {
    const id = sessionStorage.getItem('userid');
    if(id!=null)
    {
      this.userid=id
      const cartItems=this.cookieService.get(this.userid);
      if(cartItems) {
        this.cartItems = JSON.parse(cartItems);
      }
    } 
 }

 addToCart(product: IProduct) {
   this.checkProduct(product);
   if(!this.flag){
     this.cartItems.push(product);
   }

   this.cookieService.set(this.userid, JSON.stringify(this.cartItems));
   this.cookieService.set('counter', JSON.stringify(this.cartItems.length));
   console.log(this.cartItems.length);
 }

 removeFromCart(productId?:number){
  var updatedItems= this.getCartItems().filter(i=>i.id !==productId);
  this.cartItems=updatedItems;
  this.cookieService.set(this.userid, JSON.stringify(this.cartItems));
  this.cookieService.set('counter', JSON.stringify(this.cartItems.length));

 }

 updateCartItem(productId:number,qty:number){
   const index =  this.getCartItems().findIndex(item => item.id === productId);
   if (index !== -1) {
     this.getCartItems()[index].Qty = qty;
   }
  this.cookieService.set(this.userid, JSON.stringify(this.cartItems));
  this.cookieService.set('counter', JSON.stringify(this.cartItems.length));
 }

 checkProduct(product: IProduct) {
   var products= this.getCartItems();
   for (const item of products) {
     if(item.id==product.id)
     {
       item.Qty+=1;
       this.flag=true;
       break;
     }
 }
 }

 getCartItems(): IProduct[] {
   return this.cartItems;
 }

 clearCart() {
   this.cartItems = [];
   this.cookieService.set(this.userid, JSON.stringify(this.cartItems));
   this.cookieService.set('counter', JSON.stringify(this.cartItems.length));
   return this.cartItems;
 }

 RemoveCart() {
   this.cartItems = [];
   this.cookieService.delete(this.userid);
   this.cookieService.delete("counter");
   return this.cartItems;
 }
}