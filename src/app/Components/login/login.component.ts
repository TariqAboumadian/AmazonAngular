import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUserLogin } from 'src/app/Models/iuser-login';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 user:IUserLogin={} as IUserLogin;
  isCheck:boolean=false;
  constructor(private userService:UserService,private router:Router,
              private cookiesService:CookieService){}

  login(){
    this.isCheck=isNaN(Number(this.user.EmailAddress))
    
    if(!this.isCheck)
    {
    this.user.Phone=this.user.EmailAddress;
    this.user.EmailAddress=undefined;
    }

    this.userService.login(this.user).subscribe(data=>{
      this.cookiesService.set('token',data);
      if(this.isCheck && this.cookiesService.get('userName')==null)
      {
      this.cookiesService.set('userName','');
      }
      else if(this.cookiesService.get('userName')==null)
      {
      //  this.cookiesService.set('userName',this.user.EmailAddress);
      }
      this.router.navigate(['/Home'])
      
  });
   }
}
