import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveproceduresComponent } from './activeprocedures.component';

describe('ActiveproceduresComponent', () => {
  let component: ActiveproceduresComponent;
  let fixture: ComponentFixture<ActiveproceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveproceduresComponent]
    });
    fixture = TestBed.createComponent(ActiveproceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
