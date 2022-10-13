import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/product.model';
import { category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `https://young-sands-07814.herokuapp.com/api/categories`


  constructor(private http:HttpClient) { }

  getAll(limit?:number, offset?:number){
     let params = new HttpParams();
     if(limit && offset){
       params = params.set('limit',limit);
       params = params.set('offset',offset);
     }
     return this.http.get<category[]>(this.apiUrl,{params})
  }
}
