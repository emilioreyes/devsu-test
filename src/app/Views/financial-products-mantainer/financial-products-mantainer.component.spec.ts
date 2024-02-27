import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductsMantainerComponent } from './financial-products-mantainer.component';

describe('FinancialProductsMantainerComponent', () => {
  let component: FinancialProductsMantainerComponent;
  let fixture: ComponentFixture<FinancialProductsMantainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsMantainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialProductsMantainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
