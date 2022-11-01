import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ImgComponent } from '../shared/components/img/img.component';
import { ProductoComponent } from '../shared/components/producto/producto.component';
import { ProductsComponent } from '../shared/components/products/products.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    ProductoComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
  ],
  exports:[

    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    ProductoComponent,
    ProductsComponent

  ]
})
export class SharedModule { }
