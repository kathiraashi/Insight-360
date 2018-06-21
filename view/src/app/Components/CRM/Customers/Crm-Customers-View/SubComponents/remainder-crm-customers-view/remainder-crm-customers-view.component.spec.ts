import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainderCrmCustomersViewComponent } from './remainder-crm-customers-view.component';

describe('RemainderCrmCustomersViewComponent', () => {
  let component: RemainderCrmCustomersViewComponent;
  let fixture: ComponentFixture<RemainderCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemainderCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainderCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
