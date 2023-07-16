import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  {path:'register' , component:RegistrationComponent,title:"Registeration"},
  {path:'Login' , component:LoginComponent,title:"Login"},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
