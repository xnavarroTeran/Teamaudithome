import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmenuMainComponent } from './vmenu-main.component';

describe('VmenuMainComponent', () => {
  let component: VmenuMainComponent;
  let fixture: ComponentFixture<VmenuMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmenuMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmenuMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
