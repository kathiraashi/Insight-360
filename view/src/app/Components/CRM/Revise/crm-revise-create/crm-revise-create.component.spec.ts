import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReviseCreateComponent } from './crm-revise-create.component';

describe('CrmReviseCreateComponent', () => {
  let component: CrmReviseCreateComponent;
  let fixture: ComponentFixture<CrmReviseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReviseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReviseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
