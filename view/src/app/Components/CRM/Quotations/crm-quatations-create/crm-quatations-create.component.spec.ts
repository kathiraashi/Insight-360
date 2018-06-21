import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmQuatationsCreateComponent } from './crm-quatations-create.component';

describe('CrmQuatationsCreateComponent', () => {
  let component: CrmQuatationsCreateComponent;
  let fixture: ComponentFixture<CrmQuatationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmQuatationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmQuatationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
