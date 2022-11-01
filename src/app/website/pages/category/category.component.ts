import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  limit = 10;
  ofsset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params=>{
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productService.getAllByCategory(this.categoryId, this.limit, this.ofsset)
        }
        return [];
      })
    )
    .subscribe((data) => {
       this.products = data;
    });
  }
  onLoadMore(){
    if(this.categoryId){
      this.productService.getAllByCategory(this.categoryId,this.limit,this.ofsset)
      .subscribe((data)=>{
        this.products= this.products.concat(data);
        this.ofsset += this.limit;
      })
    }
  }
}
