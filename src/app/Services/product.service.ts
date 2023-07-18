import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/Environments/environment.development';
import { Observable } from 'rxjs';
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


  AddProduct(newproduct:IProduct):Observable<IProduct>{
    return this.httpclient.post<IProduct>(`${environment.BaseApiUrl}/products/`,JSON.stringify(newproduct),this.http);
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
  GetProductsbyPrice(min:number,max:number):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/FillterByPrice?minprice=${min}&maxprice=${max}`);
  }
  GetProductsByName(name:string):Observable<IProduct[]>{
    return this.httpclient.get<IProduct[]>(`${environment.BaseApiUrl}/Product/SerchByName?name=${name}`);
  }



  DeleteProduct(id:number):Observable<IProduct>{
    return this.httpclient.delete<IProduct>(`${environment.BaseApiUrl}/products/${id}`,this.http);
  }

  UpdateProduct(newproduct:IProduct,id:number):Observable<IProduct>{
    return this.httpclient.put<IProduct>(`${environment.BaseApiUrl}/products/${id}`,JSON.stringify(newproduct),this.http);
  }

}
