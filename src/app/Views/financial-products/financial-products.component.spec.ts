import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {HttpClientTestingModule}from '@angular/common/http/testing'
import { FinancialProductsComponent } from './financial-products.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ProductResponse } from '../../models/product-model';
import {Location} from "@angular/common";
import {routes} from '../../app.routes'
import { Router } from '@angular/router';


describe('FinancialProductsComponent', () => {
  let component: FinancialProductsComponent;
  let fixture: ComponentFixture<FinancialProductsComponent>;

  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsComponent,HttpClientTestingModule,RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();

    router = TestBed.get(Router)
    location = TestBed.get(Location)

    fixture = TestBed.createComponent(FinancialProductsComponent);
    router.initialNavigation()

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be product emmited',fakeAsync(()=>{
    const app = fixture.componentInstance;

    let newItem:ProductResponse={
      id: "trj-credito",
        name: "tarjete de credito",
        description: "tarjete de consumo",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2023-02-01T00:00:00.000+00:00"
    }
    app.data=newItem
    app.productEmmited(newItem)
    tick();
    expect(location.path()).toBe('/mantainer');
  }))
});
