import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcctComponent } from './myacct.component';

describe('MyacctComponent', () => {
  let component: MyAcctComponent;
  let fixture: ComponentFixture<MyAcctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAcctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAcctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
