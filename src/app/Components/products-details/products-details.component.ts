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
  customerReviews:IRating[]=[];
  productRates:{[rate:number]:number}={}
  productRating:number=0;
  reviewsCount:number=0;
  language:string=localStorage.getItem("lang") || "en";
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
      this.customerReviews=data;
       this.reviewsCount = data.length
      var sum=0;
      data.forEach(a=>sum+=a.rate)
       this.productRating=Math.ceil(sum/this.reviewsCount)
    })

    this.productRatingService.CalculateProductRating(this.prodid).subscribe(data=>{
      this.productRates=data;
      for(var i=1;i<=5;i++)
      {
       if(data[i]==undefined){
        this.productRates[i]=0
       }
      }
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
