import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelActivitiesCustomersViewComponent } from './model-activities-customers-view.component';

describe('ModelActivitiesCustomersViewComponent', () => {
  let component: ModelActivitiesCustomersViewComponent;
  let fixture: ComponentFixture<ModelActivitiesCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelActivitiesCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelActivitiesCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
