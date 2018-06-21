import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmQuatationsListComponent } from './crm-quatations-list.component';

describe('CrmQuatationsListComponent', () => {
  let component: CrmQuatationsListComponent;
  let fixture: ComponentFixture<CrmQuatationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmQuatationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmQuatationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
