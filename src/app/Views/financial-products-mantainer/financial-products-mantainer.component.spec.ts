import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {HttpClientTestingModule}from '@angular/common/http/testing'
import { FinancialProductsMantainerComponent } from './financial-products-mantainer.component';
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {routes} from '../../app.routes'
import {Location} from "@angular/common";
import { FinancialProductsComponent } from '../financial-products/financial-products.component';
import { ProductResponse } from '../../models/product-model';
describe('FinancialProductsMantainerComponent', () => {
  let component: FinancialProductsMantainerComponent;
  let fixture: ComponentFixture<FinancialProductsMantainerComponent>;
  let sendButton: ElementRef;
  let de: DebugElement;

  let location: Location;
  let router: Router;
  let newItem:ProductResponse={
    id: "trj-credito",
      name: "tarjete de credito",
      description: "tarjete de consumo",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-02-01T00:00:00.000+00:00",
      date_revision: "2023-02-01T00:00:00.000+00:00"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsComponent,FinancialProductsMantainerComponent,HttpClientTestingModule,RouterTestingModule.withRoutes(routes)]
   
    })
    .compileComponents();
    
    router = TestBed.get(Router)
    location = TestBed.get(Location)

    fixture = TestBed.createComponent(FinancialProductsMantainerComponent);
    router.initialNavigation()
    component = fixture.componentInstance;
    de = fixture.debugElement;
    sendButton = de.query(By.css('.wrap__button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shuld navigate to new page',fakeAsync(()=>{
    sendButton.nativeElement.click();
    tick();
    expect(location.path()).toBe('/financial-products');
  }))

  it('shuld navigate to editPage page',fakeAsync(()=>{
    const app = fixture.componentInstance;

    app.onEdit(newItem)
    sendButton.nativeElement.click();
    tick();
    expect(location.path()).toBe('/financial-products');
  }))

  it('should modal and asign item to delete',()=>{
    const app = fixture.componentInstance;

    app.onDelete(newItem)
    expect(app.itemDelete).toEqual(newItem)
  })
  it('should change format day ',()=>{
    const date=component.getFormatDate("2023-02-01T00:00:00.000+00:00")
    expect(date).toEqual("01/02/2023")
  })
  it('should get Product list',()=>{
    const app = fixture.componentInstance;
    app.getProducts()

    expect(app.list).toEqual([])
  })
  it('should search by text',()=>{
    const app = fixture.componentInstance;
    let array:ProductResponse[]=[]
    array.push(newItem)
    app.list=array
    app.text="trj"
    app.searchText()
    expect(app.listFilter[0].id).toEqual('trj-credito')
  })
  it('should delete product and fill list',()=>{
    const app = fixture.componentInstance;
    app.itemDelete=newItem
    app.emmitedDelete(true)
    expect(app.list).toEqual([])
  })
});
