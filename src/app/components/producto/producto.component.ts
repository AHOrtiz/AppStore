/* eslint-disable @angular-eslint/no-input-rename */
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Product} from '../../models/product.model'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent  {

  @Input('product') product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() ShowProduct = new EventEmitter<string>();
  // @Input()
  // product:Product = {
  //   id: '',
  //   price :0 ,
  //   image : '',
  //   name : ''
  // }
  constructor() { }



  public onAddToCart(){
       this.addedProduct.emit(this.product);
  }
  public onShowDetail(){
    this.ShowProduct.emit(this.product.id);
  }

}
