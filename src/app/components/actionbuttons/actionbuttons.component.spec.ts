import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionbuttonsComponent } from './actionbuttons.component';

describe('ActionButtonComponent', () => {
  let component: ActionbuttonsComponent;
  let fixture: ComponentFixture<ActionbuttonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionbuttonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
