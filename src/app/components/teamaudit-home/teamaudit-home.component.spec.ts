import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamauditHomeComponent } from './teamaudit-home.component';

describe('TeamauditHomeComponent', () => {
  let component: TeamauditHomeComponent;
  let fixture: ComponentFixture<TeamauditHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamauditHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamauditHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
