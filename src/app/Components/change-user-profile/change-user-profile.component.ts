import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserProfile } from 'src/app/Models/iuser-profile';
import { UserProfileService } from 'src/app/Services/user-profile.service';

@Component({
  selector: 'app-change-user-profile',
  templateUrl: './change-user-profile.component.html',
  styleUrls: ['./change-user-profile.component.css']
})
export class ChangeUserProfileComponent implements OnInit {

    id?:string|null;
    userchange:string='';
    key?:string|null;
    userProfile:IUserProfile={} as IUserProfile;
    constructor (private activatedRoute: ActivatedRoute,private userProfileService:UserProfileService,
      private location:Location){
    }

    public ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramMap=>{

        this.userProfile.userName=paramMap.get('name')||'';
        this.userProfile.phone=paramMap.get('phone')||'';
        this.userProfile.emailAddress=paramMap.get('email')||'';
        this.key= paramMap.get('key');
    })
    
    this.id=sessionStorage.getItem('userid');
    }

  saveChanges(){
        if(this.id)
        {
         if(this.userProfile.emailAddress=="")
         {
          this.userProfile.emailAddress=null;
         }
         this.userProfileService.updateUser(this.id,this.userProfile).subscribe(data=>{
          this.location.back();
         })
        }
      }
    
}

