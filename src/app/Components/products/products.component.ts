import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { IProduct } from 'src/app/Models/iproduct';
import { ISubCategory } from 'src/app/Models/isub-category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { PriceVM } from 'src/app/ViewModel/price-vm';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  catid: number = 0;


  products: IProduct[] = [];
  subcategories: ISubCategory[] = [];
  page: number = 1;
  itemsperpage: number = 3;
  lnaguage:string="en";
  constructor(
    private activeroute: ActivatedRoute,
    private productservices: ProductService,
    private subcategoryservice: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.catid = this.activeroute.snapshot.paramMap.get('catid')
      ? Number(this.activeroute.snapshot.paramMap.get('catid'))
      : 0;
      this.lnaguage=localStorage.getItem('lang') || 'en';
    this.productservices
      .GetProductByCategoryId(this.catid)
      .subscribe((data) => {
        this.products = data;
      });

    this.productservices
      .GetProductByCategoryId(this.catid)
      .subscribe((data) => {
        this.products = data;
      });

    this.subcategoryservice.GetAllSubCategoryes().subscribe((data) => {
      this.subcategories = data;
    });
  }

  GetPricedProducts(min: number, max: number) {
    console.log('print category Id');
    console.log(this.catid);

    this.productservices
      .GetProductsbyPrice(this.catid, min, max)
      .subscribe((data) => {
        this.products = data;
      });
  }
  GetPricedProductsAbove(price: number) {
    this.productservices
      .GetProductsbyPriceMax(this.catid, price)
      .subscribe((data) => {
        this.products = data;
      });
  }
  GetProductsBysubcategory(id: number) {
    this.productservices.GetProductByCategoryId(id).subscribe((data) => {
      this.products = data;
    });
  }
}
