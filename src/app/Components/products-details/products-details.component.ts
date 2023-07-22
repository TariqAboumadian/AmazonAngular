import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  images:string[]=[];
  constructor(private productservice:ProductService,private route:Router,
    private activerouter:ActivatedRoute){}

    prodid: number=0;
    numbers: number[]=[];
    product:IProduct|undefined;
    lnguage:string="en";
  ngOnInit(): void {
    this.prodid=this.activerouter.snapshot.paramMap.get('prodid')?Number(this.activerouter.snapshot.paramMap.get('prodid')):0;
    console.log(this.prodid);
    // this.product=this.prodservice.GetProductById(this.prodid);
    // console.log(this.product);
    this.productservice.GetProductById(this.prodid).subscribe(data=>{
      this.product=data;
      console.log(data);
      this.numbers = [...Array(10).keys()].map(i => i + 1);
    });
    this.lnguage=localStorage.getItem('lang') || 'en';
  }
//   arr:number[]=[];
//   range(first:number,last:number):number[]{

//     for (let i = first; i <= last; i++) {
//       this.arr[i]=i;
//     }
//     return this.arr;
// }
}
