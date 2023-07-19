import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/Environments/environment.development';
import { Observable } from 'rxjs';
import { PriceVM } from '../ViewModel/price-vm';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http={};
  constructor(private httpclient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
}
  GetAllProducts():Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/AllProducts`);
  }
  GetProductsPaginated(pagenumber:number,items:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/ProductsPagination?pagenumber=${pagenumber}&items=${items}`);
  }
  GetProductById(id:number):Observable<IProduct>{
    return this.httpclient.get<IProduct>(`${environment.BaseApiUrl}/Product/GetProdById?id=${id}`);
  }
  GetProductByCategoryId(id:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/GetProductsByCategory?categoryid=${id}`);
  }
  GetProductsbyPrice(catid:number,min:number,max:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/FillterByPrice?catid=${catid}&minprice=${min}&maxprice=${max}`);
  }

  GetProductsbyPriceMax(catid:number,max:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/FillterByPriceMax?catid=${catid}&maxprice=${max}`);
  }

  GetProductsByName(name:string):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/SerchByName?name=${name}`);
  }

  GetMinMaxPrice(id:number):Observable<PriceVM>{
    return this.httpclient.get<PriceVM>(`${environment.BaseApiUrl}/Product/GetMinMaxPrice?categoryid=${id}`);
  }
}
