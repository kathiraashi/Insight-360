import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrConfigComponent } from './hr-config.component';

describe('HrConfigComponent', () => {
  let component: HrConfigComponent;
  let fixture: ComponentFixture<HrConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
