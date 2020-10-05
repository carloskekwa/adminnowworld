import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcartComponent } from './edit-cart.component';

describe('EditcartComponent', () => {
  let component: EditcartComponent;
  let fixture: ComponentFixture<EditcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
