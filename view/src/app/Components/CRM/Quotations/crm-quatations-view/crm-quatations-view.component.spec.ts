import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmQuatationsViewComponent } from './crm-quatations-view.component';

describe('CrmQuatationsViewComponent', () => {
  let component: CrmQuatationsViewComponent;
  let fixture: ComponentFixture<CrmQuatationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmQuatationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmQuatationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
