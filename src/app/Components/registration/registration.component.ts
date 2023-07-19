import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/Models/iuser-register';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user:IUserRegister={} as IUserRegister;
  isCheck:boolean=false;
  constructor(private userService:UserService,private router:Router){}

  register(){
    this.isCheck=isNaN(Number(this.user.EmailAddress))
    
    if(!this.isCheck)
    {
    this.user.Phone=this.user.EmailAddress;
    this.user.EmailAddress=undefined;
    }

    this.userService.Register(this.user).subscribe(data=>{
      this.router.navigate(['/Login'])
      
  });
   }
}
