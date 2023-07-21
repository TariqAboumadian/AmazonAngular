import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { PriceVM } from 'src/app/ViewModel/price-vm';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private activeroute:ActivatedRoute,private productservices:ProductService,private subcategoryservice:CategoryService){}
  catid: number=0;
  products:IProduct[]=[];
  priceminmax:PriceVM|undefined;
  PriceRangeList:number[]=[];
  subcategories:ISubCategory[]=[];
  categorysub:ISubCategory[]=[];
  filterproducts:IProduct[]=[];

  page:number=1;
  itemsperpage:number=3;



  ngOnInit(): void {

    this.catid=this.activeroute.snapshot.paramMap.get('catid')?Number(this.activeroute.snapshot.paramMap.get('catid')):0;
    this.productservices.GetProductByCategoryId(this.catid).subscribe(data=>{
      this.products=data;
    });

    this.productservices.GetProductByCategoryId(this.catid).subscribe(data=>{
      this.products=data;
    });
    
    this.subcategoryservice.GetAllSubCategoryes().subscribe(data=>{
      this.subcategories=data;
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
  GetProductsBysubcategory(id:number){
    this.productservices.GetProductByCategoryId(id).subscribe(data=>{
      this.products=data;
    });
  }
}



