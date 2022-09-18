import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from '../../services/products.service';

import SwiperCore from 'swiper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public  myShoppingCart:Product[]=[];
  public  total = 0;

  products:Product[]=[];
  showProductDetail = false;
  productChosen !: Product;
  // today = new Date();
  // date = new Date (2021,1,21);

  constructor(private store:StoreService, private productService:ProductsService) {
    this.myShoppingCart = this.store.getShoppingCart();
   }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(data=>{
        console.log(data);
        this.products= data;
      })
  }
  public onAddToShoppingCart(product:Product){
     this.store.addProduct(product);
     this.total=this.store.getTotal()
  }

  public toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  public OnShowDetail(id:string){
    this.productService.getProduct(id)
    .subscribe(data =>{
       this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  public createNewProduct(){
    const product: CreateProductDTO ={
      title:'Nuevo Producto',
      description:'blb blv vlña',
      images :[`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price : 1000,
      categoryId : 2

    }
    this.productService.createProduct(product)
    .subscribe(res =>{
      console.log('Created',res);
      this.products.unshift(res);
    })
  }

  public editProduct(){
    const changes : UpdateProductDTO ={
      title:'Nuevo titulo'
    }
    const id = this.productChosen.id;
    this.productService.updateProduct(id,changes)
    .subscribe(data=>{
      console.log('Modificated',data)
    })
  }

  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
