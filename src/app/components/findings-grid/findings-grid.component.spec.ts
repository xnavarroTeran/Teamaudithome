import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsGridComponent } from './findings-grid.component';

describe('FindingsGridComponent', () => {
  let component: FindingsGridComponent;
  let fixture: ComponentFixture<FindingsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
