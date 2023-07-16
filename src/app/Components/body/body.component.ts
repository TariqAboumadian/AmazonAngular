import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit  {
constructor(private categoryservice: CategoryService,private productservices:ProductService,private router:Router){

}
CategoryList:ICategory[]=[];
SubCategoryList:ISubCategory[]=[];
ProductList:IProduct[]=[];
  ngOnInit(): void {
    this.categoryservice.GetAllCategories().subscribe(data=>{
      this.CategoryList=data;
      console.log(this.CategoryList);
    });
    this.categoryservice.GetSubCategoryesByCategoryId(1).subscribe(data=>{
      this.SubCategoryList=data;
      console.log(this.SubCategoryList);
    });


    this.productservices.GetAllProducts().subscribe(data=>{
      this.ProductList=data;
      console.log(this.ProductList);
    });

    this.productservices.GetProductsPaginated(2,2).subscribe(data=>{
      this.ProductList=data;
      console.log(this.ProductList);
    });
    this.productservices.GetProductByCategoryId(1).subscribe(data=>{
      this.ProductList=data;
      console.log(this.ProductList);
    });
    this.productservices.GetProductsbyPrice(100,300).subscribe(data=>{
      this.ProductList=data;
      console.log(this.ProductList);
    });
    this.productservices.GetProductsByName("ss").subscribe(data=>{
      this.ProductList=data;
      console.log(this.ProductList);
    });
  }
}
