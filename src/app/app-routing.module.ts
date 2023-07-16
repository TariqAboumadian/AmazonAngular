import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { BodyComponent } from './Components/body/body.component';
import { ParentComponentComponent } from './Components/parent-component/parent-component.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductsDetailsComponent } from './Components/products-details/products-details.component';

const routes: Routes = [
  {path:'',component:ParentComponentComponent,children:[
    {path:'',redirectTo:"Home",pathMatch:'full'},
    {path:'Home',component:BodyComponent,title:"Home"},
    {path:'Products/:catid',component:ProductsComponent,title:"Get Products"},
    {path:'ProductsDetails/:prodid',component:ProductsDetailsComponent,title:"Get Products Details"}
  ]},
  {path:'register' , component:RegistrationComponent,title:"Registeration"},
  {path:'Login' , component:LoginComponent,title:"Login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
