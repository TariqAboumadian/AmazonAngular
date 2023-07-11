import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  CategoryList:ICategory[]=[];
  SubCategoryList:ISubCategory[]=[];
  constructor(private categoryservice: CategoryService,private productservices:ProductService){}

  ngOnInit(): void {
    this.categoryservice.GetAllCategories().subscribe(data=>{
      this.CategoryList=data;
    });
    this.categoryservice.GetSubCategoryesByCategoryId(1).subscribe(data=>{
      this.SubCategoryList=data;
      for(let ite of this.CategoryList){
        console.log(ite.name);
      }
    });
  }
}
