import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersdialogComponent } from './customersdialog.component';

describe('CustomersdialogComponent', () => {
  let component: CustomersdialogComponent;
  let fixture: ComponentFixture<CustomersdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
