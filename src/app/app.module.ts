import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule , HTTP_INTERCEPTORS}from '@angular/common/http'
import { QuicklinkModule } from 'ngx-quicklink';


import { AppComponent } from './app.component';


import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    QuicklinkModule


  ],
  exports:[

  ],
  providers: [

    {provide:HTTP_INTERCEPTORS,useClass:TimeInterceptor, multi:true  },
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor, multi:true  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
