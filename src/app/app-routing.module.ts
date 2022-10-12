import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AppModule } from './app.module';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    path: 'notFound',
    component: NotFoundComponent
  },
  {
    path: 'cart',
    component: MyCartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [ RouterModule.forRoot(routes)],


  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
