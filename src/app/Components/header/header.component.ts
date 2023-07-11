import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  _productName: string="";
  get prodname():string{
    return this._productName;
  }
  set prodname(value:string){
    this._productName=value;
  }
}
