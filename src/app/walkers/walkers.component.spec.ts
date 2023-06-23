import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkersComponent } from './walkers.component';

describe('WalkersComponent', () => {
  let component: WalkersComponent;
  let fixture: ComponentFixture<WalkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalkersComponent]
    });
    fixture = TestBed.createComponent(WalkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
