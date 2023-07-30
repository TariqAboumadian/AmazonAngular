import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Igetshippingaddress } from 'src/app/Models/igetshippingaddress';
import { IOrder } from 'src/app/Models/iorder';
import { OrderService } from 'src/app/Services/order.service';
import { ShippingaddressService } from 'src/app/Services/shippingaddress.service';

@Component({
  selector: 'app-trackingorder',
  templateUrl: './trackingorder.component.html',
  styleUrls: ['./trackingorder.component.css'],
})
export class TrackingorderComponent implements OnInit {
  order: IOrder = {} as IOrder;
  shippingAddress: Igetshippingaddress = {} as Igetshippingaddress;
  id: number = 0;
  //status:number=0;
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private shippingaddressService: ShippingaddressService,
    private  router:Router
  ) {}
  ngOnInit(): void {
    this.setOrderIdByparam();
    this.getOrderById();
    this.getShippingAddress();
  }
  setOrderIdByparam() {
    this.id = this.activatedRoute.snapshot.paramMap.get('orderId')
      ? Number(this.activatedRoute.snapshot.paramMap.get('orderId'))
      : 0;
  }
  getOrderById() {
    this.orderService.GetOrderById(this.id).subscribe((data: IOrder) => {
      this.order = data;
      console.log(this.order);
    });
  }
  getShippingAddress() {
    const id = sessionStorage.getItem('userid');
    if (id != null) {
      this.shippingaddressService
        .GetShippingAddress(id)
        .subscribe((data: Igetshippingaddress) => {
          this.shippingAddress = data;
        });
    }
  }
  cancleOrder(id: number) {

    if (this.order.status <2) {
      this.orderService.DeleteOrder(id).subscribe((data:IOrder) =>
      {
        this.router.navigate(['/Order', this.order.userId]);
      }
      );
    }
  }
}
