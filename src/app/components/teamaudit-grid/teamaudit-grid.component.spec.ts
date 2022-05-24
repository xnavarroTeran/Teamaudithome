import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamauditGridComponent } from './teamaudit-grid.component';

describe('TeamauditGridComponent', () => {
  let component: TeamauditGridComponent;
  let fixture: ComponentFixture<TeamauditGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamauditGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamauditGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
