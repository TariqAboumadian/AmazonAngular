import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  categoryId:number;
  constructor(
    private categoryservice: CategoryService,
    private productservices:ProductService,
    private router: Router,
    private httpclient:HttpClient)
  {
    this.categoryId=0;
  }

  ngOnInit(): void {
    this.categoryservice.GetAllCategories().subscribe(data=>{
      this.CategoryList=data;
      console.log(this.CategoryList);
    });
    this._lang=localStorage.getItem('lang')||'en';
  }
  onSearchButtonClick(searchInputValue: string): void {
    this.router.navigate(['/products'], { queryParams: { sentCatid:this.categoryId,term: searchInputValue } });
    //this.router.navigate(['/products',this.categoryId,searchInputValue]);
  }
  _lang:string='en';
  get Changlang(){
    return this._lang;
  }
  set Changlang(value:string){
    this._lang=value;
    localStorage.setItem('lang',value);
    window.location.reload();
  }
}
