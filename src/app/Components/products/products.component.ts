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
  categoryIds: number[] = [];
  searchTerm: string;
  catid: number = 0;
  //sentCatid: number;

  products: IProduct[] = [];
  filterdProduct: IProduct[] = [];

  priceminmax: PriceVM | undefined;
  PriceRangeList: number[] = [];
  subcategories: ISubCategory[] = [];
  page: number = 1;
  itemsperpage: number = 3;
  constructor(
    private activeroute: ActivatedRoute,
    private productservices: ProductService,
    private subcategoryservice: CategoryService
  ) {
    //this.sentCatid=0;
    this.searchTerm='';
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params) => {
      this.catid = params['sentCatid'];
      this.searchTerm = params['term'];
      if (this.catid != undefined && this.searchTerm!=undefined && this.catid!=0) {
        this.subcategoryservice
          .GetSubCategoryesByCategoryId(this.catid)
          .subscribe((subcategoriesResult) => {
            this.categoryIds = subcategoriesResult.map(
              (category) => category.id
            );
            this.products = [];
            this.categoryIds.forEach((cid) => {
              this.getProductBySearchCategoryId(cid);
            });
          });
      }
      else if((this.catid != undefined && this.searchTerm!=undefined) || this.catid==0)
      {
        this.productservices.GetAllProducts().subscribe((productList) => {
          let res: IProduct[] = [];
          if (productList.length > 0) {
            res = productList.filter((item: IProduct) => {
              return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
            this.products.push(...res);
          }
        });
      }

    });

    this.catid = this.activeroute.snapshot.paramMap.get('catid')
      ? Number(this.activeroute.snapshot.paramMap.get('catid'))
      : 0;

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

    this.productservices.GetMinMaxPrice(this.catid).subscribe((data) => {
      this.priceminmax = data;
      let min = this.priceminmax?.minPrice;
      let max = this.priceminmax?.maxPrice;
      for (let i = min; i <= max; i += 50) {
        this.PriceRangeList.push(i);
      }
      //console.log(this.PriceRangeList);
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

  private getProductBySearchCategoryId(id: number): void {
    this.productservices.GetProductByCategoryId(id).subscribe((data) => {
      let res: IProduct[] = [];
      if (data.length > 0) {
        res = data.filter((item: IProduct) => {
          return item.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
        this.products.push(...res);
      }
    });
  }
}
