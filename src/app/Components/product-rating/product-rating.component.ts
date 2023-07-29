import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRating } from 'src/app/Models/irating';
import { ProductRatingService } from 'src/app/Services/product-rating.service';
@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnInit {

  productId?:number|null;
  productName?:string|null;
  productImg?:string|null;
  showButton:boolean=false;
  countrate:number=1;
  userForm: FormGroup;
  productRate:IRating={} as IRating;
constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute,
  private productRatingService: ProductRatingService,private location:Location){
this.userForm=this.fb.group({
  review:[''],
 userName:[''],
 rate:[,Validators.min(1)]
})
}
get review(){
  return this.userForm.get('review');
}
get userName(){
  return this.userForm.get('userName');
}
get rate(){
  return this.userForm.get('rate');
}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.productId=Number(paramMap.get('id'));
      this.productName=paramMap.get('name');
    this.productImg= paramMap.get('imgUrl');
    console.log(this.productId);
   })
  }
  addRate(){
    this.userForm.patchValue({
      rate:this.countrate
    })
    this.productRate=this.userForm.value
    if(this.productId)
    {
    this.productRate.productId=this.productId
    console.log(this.productRate);
    }

    this.productRatingService.AddRate(this.productRate).subscribe(data=>
      {
        console.log(data);
        this.location.back();
      })
      
   }

selectRate(event:any){
    var target=event.target;
    var id=Number(target.id);
    this.countrate=0
    const starDiv = document.querySelector('.starRating');
    if(starDiv!=null)
    {
      const elements =Array.from(starDiv.children);
    for(var i=0;i<id;i++){
      elements[i].classList.add("checked");
      this.countrate+=1
    }
    for(var i=id;i<5;i++){
      elements[i].classList.remove("checked");
    }
  }
}
clearRate(){
  const starDiv = document.querySelector('.starRating');
  this.countrate=0
  if(starDiv!=null)
  {
    const elements =Array.from(starDiv.children);
  for(var i=0;i<elements.length;i++){
    elements[i].classList.remove("checked");
  }
}
}
}
