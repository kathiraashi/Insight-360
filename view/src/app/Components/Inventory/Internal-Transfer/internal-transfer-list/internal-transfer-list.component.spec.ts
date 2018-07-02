import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferListComponent } from './internal-transfer-list.component';

describe('InternalTransferListComponent', () => {
  let component: InternalTransferListComponent;
  let fixture: ComponentFixture<InternalTransferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
