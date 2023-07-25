import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IRating } from 'src/app/Models/irating';
import { CartItemService } from 'src/app/Services/cart-item.service';
import { ProductRatingService } from 'src/app/Services/product-rating.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  images:string[]=[];
  prodid: number=0;
  Quantity:number=1;
  numbers: number[]=[];
  product:IProduct|undefined;
  productRate:IRating[]=[];
  constructor(private productservice:ProductService,private route:Router,
    private activerouter:ActivatedRoute,private cartItemService:CartItemService,
    private productRatingService: ProductRatingService){}
  ngOnInit(): void {
    this.prodid=this.activerouter.snapshot.paramMap.get('prodid')?Number(this.activerouter.snapshot.paramMap.get('prodid')):0;
    this.productservice.GetProductById(this.prodid).subscribe(data=>{
      this.product=data;
      this.numbers = [...Array(10).keys()].map(i => i + 1);
    })
    this.productRatingService.GetRatingByProductId(this.prodid).subscribe(data=>{
      this.productRate=data;   
    })
  }
addToCart(product?:IProduct){
  if(product)
  {
    product.Qty=this.Quantity;        
    var result=this.cartItemService.addToCart(product);   
    console.log(result);
  }
}

ProductRate(product?:IProduct){
  if(product)
  {
    this.route.navigate(['ProductRating',{id:this.prodid,name:product.name,imgUrl:product.images[0]}])
  }
}

}
