import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { ProductResponse } from '../../models/product-model';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let appFixture: ComponentFixture<ModalComponent>;
  let cancelButton: ElementRef;
  let confirmButton: ElementRef;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    cancelButton = de.query(By.css('.wrap__button--cancelar'));
    confirmButton = de.query(By.css('.wrap__button--confirmar'));
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
  it('should be name', () => { 
    let newItem:ProductResponse={
      id: "trj-credito",
        name: "tarjete de credito",
        description: "tarjete de consumo",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2023-02-01T00:00:00.000+00:00"
    }
    component.item=newItem
    fixture.detectChanges()
    
    let element=fixture.debugElement.nativeElement.querySelector('p').innerText
    expect(`Estas seguro de eliminar el producto ${component.item.name}`).toEqual(element);
    
  });
  it('should emit when the cancel button is clicked', () => {
    component.confirm.subscribe(next => {
      expect(next).toEqual(false);
    });
    cancelButton.nativeElement.click();
  });
  it('should emit when the confirm button is clicked', () => {
    component.confirm.subscribe(next => {
      expect(next).toEqual(true);
    });
    confirmButton.nativeElement.click();
  });
});
