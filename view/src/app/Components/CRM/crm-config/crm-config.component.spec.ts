import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmConfigComponent } from './crm-config.component';

describe('CrmConfigComponent', () => {
  let component: CrmConfigComponent;
  let fixture: ComponentFixture<CrmConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
