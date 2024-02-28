import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {HttpClientTestingModule}from '@angular/common/http/testing'
import { of } from 'rxjs';
import { inject } from '@angular/core';
import { ProductResponse } from '../models/product-model';


describe('ProductsService', () => {
  let service: ProductsService;
  let httpClientSpy:{post: jasmine.Spy,get: jasmine.Spy,delete:jasmine.Spy,put:jasmine.Spy}
  
  const mockProductRequest={
    name:"tarjete de credito",
    id:"trj-credito",
    description:"tarjete de consumo",
    logo:"https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release:"2023-02-01",
    date_revision:"2023-02-01"
  }

  const mockProductResponse:ProductResponse={
    id: "trj-credito",
    name: "tarjete de credito",
    description: "tarjete de consumo",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2023-02-01T00:00:00.000+00:00"
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    
    httpClientSpy=jasmine.createSpyObj('HttpClient',['post','get','delete','put'])
    service = new ProductsService(httpClientSpy as any);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('sholud returned object product  when save',(done: DoneFn)=>{  
    httpClientSpy.post.and.returnValue(of(mockProductResponse))
    service.save(mockProductRequest).subscribe((res)=>{
      expect(res).toEqual(mockProductResponse)
      done();
    })
  })
  it('sholud returned object product when update',(done: DoneFn)=>{
    httpClientSpy.put.and.returnValue(of(mockProductResponse))
    service.update(mockProductRequest).subscribe((res)=>{
      expect(res).toEqual(mockProductResponse)
      done();
    })
  })
  it('shoulbe return list of products',(done:DoneFn)=>{
    let array:ProductResponse[]=[]
    array.push(mockProductResponse)
    httpClientSpy.get.and.returnValue(of(array))
    service.getProducts().subscribe((res:ProductResponse[])=>{
      expect(res).toEqual(array)
      done();
    })
  })
  it('should true verification the existent ID',(done:DoneFn)=>{
    httpClientSpy.get.and.returnValue(of(true))
    service.verification('trjCredito').subscribe(res=>{
      expect(res).toEqual(true)
      done()
    })
  })
  it('should return string when removed is seuccessfully',(done:DoneFn)=>{
    let msg:string="Product succesfully removed"
    httpClientSpy.delete.and.returnValue(of(msg))
    service.delete('trjCredito').subscribe(res=>{
      expect(res).toEqual('Product succesfully removed')
      done()
    })
  })
});
