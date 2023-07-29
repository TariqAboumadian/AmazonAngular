import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form:FormGroup;
  user:IUserLogin={} as IUserLogin;
  showErrorMessage:boolean=false;
   isCheck:boolean=false;
   constructor(private userService:UserService,private router:Router,
               private cookiesService:CookieService,
               private fb:FormBuilder){
                 this.form = this.fb.group({
                   EmailAddress:['',[Validators.required]],
                   password: ['', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]],
                 })
               }
               get EmailAddress(){
                 return this.form.get('EmailAddress');
               }
               get Password(){
                 return this.form.get('password');
               }
               
   login(): void {
     this.user = this.form.value;
     console.log(this.form.value);
 
     this.isCheck = isNaN(Number(this.user.EmailAddress));
 
     if (!this.isCheck) {
       this.user.Phone = this.user.EmailAddress;
       this.user.EmailAddress = undefined;
     }
     console.log(this.user);
 
     this.userService.login(this.user).subscribe(
       (data) => {
         sessionStorage.setItem('userid', data.userId)
         if (!this.cookiesService.check(data.userId)) {
           this.cookiesService.set(data.userId,'');
         }    
         this.router.navigate(['/Home']);
       },
       (error)=>{
        this.showErrorMessage=true       
       }
     );
     
  }     
 }