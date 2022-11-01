import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http'
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

import {environment} from './../../environments/environment'
import { catchError, retry, map} from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = ` https://damp-spire-59848.herokuapp.com/api`

  constructor(private http:HttpClient) { }

  getAllByCategory(categoryId:string , limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit && offset != null){
      params = params.set('limit',limit);
      params = params.set('offset',offset)
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
  }

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit !=undefined && offset !=undefined){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>( `${this.apiUrl}/products`,{params})
      .pipe(
          retry(3),
           map(products=>products.map(item=>{
              return {
                ...item,
                taxes:.19*item.price
              }
           }))
      );
  }

  fetchReadAndUpdate(id:string, dto :UpdateProductDTO){
    return   zip(
      this.getProduct(id),
      this.updateProduct(id, dto)
    )

  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error :HttpErrorResponse)=>{
          if(error.status ===500){
            return  throwError('Algo esta fallando en el server');
          }if(error.status ===404){
            return  throwError('El producto no existe');
          }
          return  throwError('ups algo salio mal');
      })
    );
  }
  getProducByPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{
      params:{limit, offset}
    });
  }
  createProduct(data:CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`,data);
  }
  updateProduct(id:string , dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`,dto);
  }
  deleteProduct(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}

