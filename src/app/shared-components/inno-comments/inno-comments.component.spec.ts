import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnoCommentsComponent } from './inno-comments.component';

describe('InnoCommentsComponent', () => {
  let component: InnoCommentsComponent;
  let fixture: ComponentFixture<InnoCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnoCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnoCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
