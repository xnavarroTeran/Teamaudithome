import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditsGridComponent } from './audits-grid.component';

describe('AuditsGridComponent', () => {
  let component: AuditsGridComponent;
  let fixture: ComponentFixture<AuditsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
