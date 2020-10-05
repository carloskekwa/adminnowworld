import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { cartListComponent } from './cart-list.component';

describe('cartListComponent', () => {
  let component: cartListComponent;
  let fixture: ComponentFixture<cartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ cartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(cartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
