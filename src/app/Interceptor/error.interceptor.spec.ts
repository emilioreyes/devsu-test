import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, catchError, firstValueFrom, of, throwError } from 'rxjs';
import { ProductsService } from '../Services/products.service';

describe('errorInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let service: ProductsService;
let httpClient: HttpClient
  //let errorInterceptor: errorInterceptor;
 
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),ProductsService]
    });

    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient)
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('getProducts() return 400 when authorId is missing',async () => {
    const errorStr = `Header 'authorId' is missing`; 
   let testUrl="https://test/url"
   const observable$ = httpClient.get(testUrl)
    const serviceUnavailable = new HttpErrorResponse({
      status: 400,
      statusText: errorStr,
      url: testUrl
    })

    const httpReqPromise = firstValueFrom(observable$)
    httpTestingController.expectOne(testUrl).flush('error', serviceUnavailable) 
    try {
      await httpReqPromise
      fail('It should have not succeeded')
    } catch(error:any) {
      expect(error instanceof HttpErrorResponse).toBeTrue()
      expect(error.status).toEqual(400)
    }
  });
  it('should be ownner for update return 401 ',async () => {
    const errorStr = `You must be owner`; 
   let testUrl="https://test/url"
   const observable$ = httpClient.get(testUrl)
    const serviceUnavailable = new HttpErrorResponse({
      status: 401,
      statusText: errorStr,
      url: testUrl
    })

    const httpReqPromise = firstValueFrom(observable$)
    httpTestingController.expectOne(testUrl).flush('error', serviceUnavailable) 
    try {
      await httpReqPromise
      fail('It should have not succeeded')
    } catch(error:any) {
      expect(error instanceof HttpErrorResponse).toBeTrue()
      expect(error.status).toEqual(401)
    }
  });
  it('should found product id when delete return 404 ',async () => {
    const errorStr = `Not product found with that id`; 
   let testUrl="https://test/url"
   const observable$ = httpClient.get(testUrl)
    const serviceUnavailable = new HttpErrorResponse({
      status: 404,
      statusText: errorStr,
      url: testUrl
    })

    const httpReqPromise = firstValueFrom(observable$)
    httpTestingController.expectOne(testUrl).flush('error', serviceUnavailable) 
    try {
      await httpReqPromise
      fail('It should have not succeeded')
    } catch(error:any) {
      expect(error instanceof HttpErrorResponse).toBeTrue()
      expect(error.status).toEqual(404)
    }
  });
});
