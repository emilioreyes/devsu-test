import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule}from '@angular/common/http/testing'

import { FormProductComponent } from './form-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRequest, ProductResponse } from '../../models/product-model';
import { DebugElement, ElementRef, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let resetButton: ElementRef;
  let sendButton: ElementRef;
  let de: DebugElement;

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
      imports: [FormProductComponent,HttpClientTestingModule,ReactiveFormsModule,FormsModule ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    resetButton = de.query(By.css('.wrap__button--reiniciar'));
    sendButton = de.query(By.css('.wrap__button--enviar'));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be form invalid',()=>{
    const app = fixture.componentInstance;

    const form=app.formProduct
    const id=form.controls['id']
    const name=form.controls['name']
    const description=form.controls['description']
    const logo=form.controls['logo']
    const date_release=form.controls['date_release']
    const date_revision=form.controls['date_revision']

    id.setValue('trjCredito')
    name.setValue('tarjeta de credito')
    description.setValue('descripcion')
    logo.setValue('https://url_to_logo')
    expect(form.invalid).toBeTruthy()
  })

  it('should be patch form if productToEdit is not null',()=>{
    const app = fixture.componentInstance;

    const form=app.formProduct
    app.productToEdit.id=newItem.id
    app.productToEdit.name=newItem.name
    app.productToEdit.description=newItem.description
    app.productToEdit.logo=newItem.logo
    app.productToEdit.date_release=newItem.date_release
    app.productToEdit.date_revision=newItem.date_revision
    app.patchForm()
    expect(form.valid).toBeTruthy()
  })

  it('should change format day ',()=>{
    const date=component.getFormatDate("2023-02-01T00:00:00.000+00:00")
    expect(date).toEqual("01/02/2023")
  })

  it('should be error in date_revision',()=>{
    const app = fixture.componentInstance;

    const form=app.formProduct
    app.productToEdit.id=newItem.id
    app.productToEdit.name=newItem.name
    app.productToEdit.description=newItem.description
    app.productToEdit.logo=newItem.logo
    app.productToEdit.date_release=newItem.date_release
    app.productToEdit.date_revision=newItem.date_revision
    app.patchForm()
     
    app.validateRelease()
    expect(form.controls['date_release'].valid).toBeFalsy()
  })
  it('should no emmit when the form is invalid', () => {
    const app = fixture.componentInstance;
    let nullProduct:ProductRequest
    let newItem:ProductRequest={
      id: "trj-credito",
        name: "tarjete de credito",
        description: "tarjete de consumo",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2023-02-01T00:00:00.000+00:00"
    }
    const form=app.formProduct
    app.productToEdit.id=newItem.id
    app.productToEdit.name=newItem.name
    app.productToEdit.date_release=newItem.date_release
    app.productToEdit.date_revision=newItem.date_revision
    app.patchForm()
   
    sendButton.nativeElement.click()
    expect(app.showModalInfo).toBeTruthy()
  })
  it('should emmit when the form is valid', () => {
    const app = fixture.componentInstance;

    let newItem:ProductRequest={
      id: "trj-credito",
        name: "tarjete de credito",
        description: "tarjete de consumo",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2023-02-01T00:00:00.000+00:00"
    }
    const form=app.formProduct
    app.productToEdit.id=newItem.id
    app.productToEdit.name=newItem.name
    app.productToEdit.description=newItem.description
    app.productToEdit.logo=newItem.logo
    app.productToEdit.date_release=newItem.date_release
    app.productToEdit.date_revision=newItem.date_revision
    app.patchForm()
    app.product.subscribe(next => {
      expect(next.name).toEqual(newItem.name)
    })
    sendButton.nativeElement.click()
  })
  it('should reset when productToEdit is false if button reset clicked',()=>{
    const app = fixture.componentInstance;

    resetButton.nativeElement.click();
    expect(app.formProduct.controls['id'].value).toEqual("")
  })
  it('should reset when productToEdit is true if button reset clicked',()=>{
    const app = fixture.componentInstance;
 
    const form=app.formProduct
    app.productToEdit.id=newItem.id
    app.productToEdit.name=newItem.name
    app.productToEdit.description=newItem.description
    app.productToEdit.logo=newItem.logo
    app.productToEdit.date_release=newItem.date_release
    app.productToEdit.date_revision=newItem.date_revision
    app.patchForm()
    resetButton.nativeElement.click();
    expect(app.formProduct.controls['id'].value).toEqual("trj-credito")
  })
  it('should be transform date to save',()=>{
    const date=component.transformToDate("1/2/2023")
    expect(date).toEqual("2023-02-01")
  })
  it('should false if formControl id have value',()=>{
    const app = fixture.componentInstance;
    app.productToEdit.id=newItem.id
   
    app.patchForm()
    app.validate()
    expect(app.formProduct.controls["id"].hasError('confirmedValidator')).toBeFalsy()
  })
  it('should true if formControl id dont have value',()=>{
    const app = fixture.componentInstance;
    app.productToEdit.id=newItem.id
   
    app.setConfirmValidator(true)
    app.validate()
    expect(app.formProduct.controls["id"].hasError('confirmedValidator')).toBeTruthy()
  })
});
