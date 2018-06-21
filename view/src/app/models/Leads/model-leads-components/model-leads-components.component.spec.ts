import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLeadsComponentsComponent } from './model-leads-components.component';

describe('ModelLeadsComponentsComponent', () => {
  let component: ModelLeadsComponentsComponent;
  let fixture: ComponentFixture<ModelLeadsComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeadsComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeadsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
