import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotusernameComponent } from './forgotusername.component';

describe('ForgotusernameComponent', () => {
  let component: ForgotusernameComponent;
  let fixture: ComponentFixture<ForgotusernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotusernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
