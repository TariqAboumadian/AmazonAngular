import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product.service';
import { PriceVM } from 'src/app/ViewModel/price-vm';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private activeroute:ActivatedRoute,private productservices:ProductService){}
  catid: number=0;
  products:IProduct[]=[];
  priceminmax:PriceVM|undefined;
  PriceRangeList:number[]=[];

  ngOnInit(): void {

    this.catid=this.activeroute.snapshot.paramMap.get('catid')?Number(this.activeroute.snapshot.paramMap.get('catid')):0;
    this.productservices.GetProductByCategoryId(this.catid).subscribe(data=>{
      this.products=data;
    });

    this.productservices.GetProductByCategoryId(this.catid).subscribe(data=>{
      this.products=data;
    });

    this.productservices.GetMinMaxPrice(this.catid).subscribe(data=>{
      this.priceminmax=data;
      let min=this.priceminmax?.minPrice;
      let max=this.priceminmax?.maxPrice;
      for(let i=min;i<=max;i+=50){
        this.PriceRangeList.push(i);
      }
    console.log(this.PriceRangeList);
    });
  }

  GetPricedProducts(min:number,max:number){
    this.productservices.GetProductsbyPrice(this.catid,min,max).subscribe(data=>{
      this.products=data;
    });
  }
  GetPricedProductsAbove(price:number){
    this.productservices.GetProductsbyPriceMax(this.catid,price).subscribe(data=>{
      this.products=data;
    });
  }


}

