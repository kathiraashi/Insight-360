import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRemindersCustomersViewComponent } from './model-reminders-customers-view.component';

describe('ModelRemindersCustomersViewComponent', () => {
  let component: ModelRemindersCustomersViewComponent;
  let fixture: ComponentFixture<ModelRemindersCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelRemindersCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRemindersCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
