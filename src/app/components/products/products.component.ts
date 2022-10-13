import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2'
import { switchMap } from 'rxjs/operators';
import { zip} from 'rxjs'

import SwiperCore from 'swiper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {

  public  myShoppingCart:Product[]=[];
  public  total = 0;
  @Output() LoadMore:EventEmitter<string> = new EventEmitter<string>();
  //@Input() productId:string | null = null;
  @Input()
  set productId(id:string | null){
    if(id){
      this.OnShowDetail(id);
    }
  }
  @Input()products:Product[]=[];
  showProductDetail = false;
  productChosen !: Product;


  statusDetail :'loading' | 'success' | 'error'|'init' = 'init';
  // today = new Date();
  // date = new Date (2021,1,21);

  constructor(private store:StoreService, private productService:ProductsService) {
    this.myShoppingCart = this.store.getShoppingCart();
   }

  public onAddToShoppingCart(product:Product){
     this.store.addProduct(product);
     this.total=this.store.getTotal()
  }

  public toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  public OnShowDetail(id:string){
    this.statusDetail = 'loading';
    // if(!this.showProductDetail){
    //   this.showProductDetail = true;
    // }
    this.productService.getProduct(id)
    .subscribe(data =>{
       this.toggleProductDetail();
       this.productChosen = data;
       this.statusDetail = 'success';
    },errorMsg=>{
      this.statusDetail = 'error';
      Swal.fire({
        title:errorMsg,
        text :errorMsg,
        icon:'error',
        confirmButtonText :'cool'
      })
    })
  }

  public readAndUpdate(id:string){
    this.productService.getProduct(id)
    .pipe(
      switchMap((product)=>{
        return this.productService.updateProduct(product.id, { title: 'change' });
      })
    )
    .subscribe(data =>{
       console.log(data);
    });
    // zip(
    //   this.productService.getProduct(id),
    //   this.productService.updateProduct(id, { title: 'nuevo' })
    // )
    // .subscribe(response =>{
    //   const read = response[0];
    //   const  update = response[1];

    // })
    this.productService.fetchReadAndUpdate(id,{title:'change'})
    .subscribe(response=>{
         const read = response[0];
         const  update = response[1];
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
       const productIndexw  = this.products.findIndex(item => item.id === this.productChosen.id);
       this.products[productIndexw]= data;
       this.productChosen = data;
    })
  }

  public deleteProduct(){
    const id = this.productChosen.id;
    this.productService.deleteProduct(id)
     .subscribe(()=>{
      const productIndexw  = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndexw,1);
      this.showProductDetail = false;
     })
  }

    loadMore(){
      this.LoadMore.emit();
    }


}
