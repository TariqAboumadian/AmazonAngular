import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../Models/iuser-login';
import { environment } from 'src/Environments/environment.development';
import { IUserRegister } from '../Models/iuser-register';
import { Observable } from 'rxjs';
import { ITokenResponse } from '../Models/iresponse-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http={};
  constructor(private httpClient:HttpClient) {
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
   }

   login(user: IUserLogin): Observable<ITokenResponse> {
    return this.httpClient.post<ITokenResponse>(
       environment.BaseApiUrl + "/Account/Login",
       JSON.stringify(user), this.http)
   }
   Register(user:IUserRegister):Observable<IUserRegister> {
     return this.httpClient.post<IUserRegister>(environment.BaseApiUrl + "/Account/Register",
     JSON.stringify(user), this.http);
   }
   LogOut() {
     return this.httpClient.get(environment.BaseApiUrl + "/Account/LogOut");
   }
}
