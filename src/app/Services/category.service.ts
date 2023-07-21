import { Injectable } from '@angular/core';
import { ICategory } from '../Models/icategory';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/Environments/environment.development';
import { Observable } from 'rxjs';
import { ISubCategory } from '../Models/isub-category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService  {
  CategoryList:ICategory[]=[];
  private http={};
  constructor(private httpclient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json',
            'accept-language':localStorage.getItem('lang')||'en'
        })
  }
}

GetAllCategories():Observable<ICategory[]>{
  return this.httpclient.get<ICategory[]>(`${environment.BaseApiUrl}/Category/Categories`,this.http);
}
GetSubCategoryesByCategoryId(id:number):Observable<ISubCategory[]>{
  return this.httpclient.get<ISubCategory[]>(`${environment.BaseApiUrl}/Category/SubCategories?id=${id}`,this.http);
}
GetAllSubCategoryes():Observable<ISubCategory[]>{
  return this.httpclient.get<ISubCategory[]>(`${environment.BaseApiUrl}/Category/AllSubCategories`,this.http);
}
}
