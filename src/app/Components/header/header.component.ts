import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  _productName: string="";
  get prodname():string{
    return this._productName;
  }
  set prodname(value:string){
    this._productName=value;
  }
  CategoryList:ICategory[]=[];
  SubCategoryList:ISubCategory[]=[];
  constructor(private categoryservice: CategoryService,private productservices:ProductService){}

  ngOnInit(): void {
    this.categoryservice.GetAllCategories().subscribe(data=>{
      this.CategoryList=data;
      console.log(data);
      console.log(this.CategoryList);
      
    });
    this.categoryservice.GetSubCategoryesByCategoryId(1).subscribe(data=>{
      this.SubCategoryList=data;
      for(let ite of this.CategoryList){
        console.log(ite.name);
      }
    });
  }
}
