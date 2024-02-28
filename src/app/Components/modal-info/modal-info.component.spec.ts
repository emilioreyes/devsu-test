import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoComponent } from './modal-info.component';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ModalInfoComponent', () => {
  let component: ModalInfoComponent;
  let fixture: ComponentFixture<ModalInfoComponent>;
  let confirmButton: ElementRef;
  let de: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    confirmButton = de.query(By.css('.wrap__button--confirmar'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit when the confirm button is clicked', () => {
    component.confirm.subscribe(next => {
      expect(next).toEqual(true);
    });
    confirmButton.nativeElement.click();
  });
});
