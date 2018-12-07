import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmQuatationEditComponent } from './crm-quatation-edit.component';

describe('CrmQuatationEditComponent', () => {
  let component: CrmQuatationEditComponent;
  let fixture: ComponentFixture<CrmQuatationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmQuatationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmQuatationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
