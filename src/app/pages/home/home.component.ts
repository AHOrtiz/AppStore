import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  products:Product[]=[];
  limit = 10;
  offset = 0;

  constructor(private productsService:ProductsService ) { }

  // ngOnInit(): void {
  //   this.productService.getAllProducts(10,0).subscribe((data)=>{
  //     this.products=data;
  //     this.offset += this.limit;
  //   })
  // }

  public loadMore(){

    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data.filter(product => product.images.length > 0));
      this.offset += this.limit;
    });
}

   }


