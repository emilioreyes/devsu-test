import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn,provideHttpClient, withInterceptors } from '@angular/common/http';

import { authorInterceptorInterceptor } from './author-interceptor.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('authorInterceptorInterceptor', () => {

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => authorInterceptorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
       provideHttpClient(withInterceptors([authorInterceptorInterceptor])),
       provideHttpClientTesting()]
    });
    httpTestingController = TestBed.inject(HttpTestingController)
    httpClient = TestBed.inject(HttpClient)
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  
  it('should add authorId headers ', () => {
    const url = '/mockendpoint';

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.headers.get('authorId')).toEqual(
      '500'
    );
  });
});
