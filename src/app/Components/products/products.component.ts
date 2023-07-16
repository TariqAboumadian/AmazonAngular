import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private activeroute:ActivatedRoute,private productservices:ProductService){}
  catid: number=0;
  products:IProduct[]=[];
  ngOnInit(): void {
    this.catid=this.activeroute.snapshot.paramMap.get('catid')?Number(this.activeroute.snapshot.paramMap.get('catid')):0;
    console.log(this.catid);
    // this.product=this.prodservice.GetProductById(this.prodid);
    // console.log(this.product);
    this.productservices.GetProductByCategoryId(this.catid).subscribe(data=>{
      this.products=data;
      console.log(data);
    })
  }
}

