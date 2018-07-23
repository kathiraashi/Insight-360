import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelContactCustomersViewComponent } from './model-contact-customers-view.component';

describe('ModelContactCustomersViewComponent', () => {
  let component: ModelContactCustomersViewComponent;
  let fixture: ComponentFixture<ModelContactCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelContactCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelContactCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
