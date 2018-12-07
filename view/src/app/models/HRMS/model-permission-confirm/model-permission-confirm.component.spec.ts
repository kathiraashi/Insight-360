import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPermissionConfirmComponent } from './model-permission-confirm.component';

describe('ModelPermissionConfirmComponent', () => {
  let component: ModelPermissionConfirmComponent;
  let fixture: ComponentFixture<ModelPermissionConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPermissionConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPermissionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
