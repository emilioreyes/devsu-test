import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductRequest, ProductResponse } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<ProductResponse[]>(`${environment.API_URL}/products`)
  }
  save(product:ProductRequest){
    return this.http.post<ProductResponse>(`${environment.API_URL}/products`,product)
  }
  update(product:ProductRequest){
    return this.http.put<ProductResponse>(`${environment.API_URL}/products`,product)
  }
  delete(id:string){
    let params = new HttpParams()
    params = params.append('id', id);
    return this.http.delete(`${environment.API_URL}/products`,{params})
  }
  verification(id:string){
    let params = new HttpParams()
    params = params.append('id', id);
    return this.http.get<boolean>(`${environment.API_URL}/products/verification`,{params})
  }
}
