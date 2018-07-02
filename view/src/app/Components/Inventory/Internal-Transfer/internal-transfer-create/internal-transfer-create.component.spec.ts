import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferCreateComponent } from './internal-transfer-create.component';

describe('InternalTransferCreateComponent', () => {
  let component: InternalTransferCreateComponent;
  let fixture: ComponentFixture<InternalTransferCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
