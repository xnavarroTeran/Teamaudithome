import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmenuGridComponent } from './vmenu-grid.component';

describe('VmenuGridComponent', () => {
  let component: VmenuGridComponent;
  let fixture: ComponentFixture<VmenuGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmenuGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmenuGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
