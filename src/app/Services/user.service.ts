import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../Models/iuser-login';
import { environment } from 'src/Environments/environment.development';
import { IUserRegister } from '../Models/iuser-register';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITokenResponse } from '../Models/iresponse-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedBehSubject:BehaviorSubject<boolean>;
  private http={};
  constructor(private httpClient:HttpClient) {
    this.userLoggedBehSubject=new BehaviorSubject<boolean>(this.isLogged);
    this.http={
      headers:new HttpHeaders(
        {
            'content-type': 'application/json'
        })
  }
   }
   get isLogged():boolean {
    return (sessionStorage.getItem('token'))?true:false;
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
