import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CareerComponent } from './career/career.component';
import { SigninComponent } from './auth/signin/signin.component';



const routes: Routes = [
 {path:'home', component:HomeComponent},
 {path:'about', component:AboutComponent},
 {path:'career', component:CareerComponent},
 {path:'signin', component:SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
