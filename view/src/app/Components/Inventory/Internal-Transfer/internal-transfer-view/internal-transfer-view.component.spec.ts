import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferViewComponent } from './internal-transfer-view.component';

describe('InternalTransferViewComponent', () => {
  let component: InternalTransferViewComponent;
  let fixture: ComponentFixture<InternalTransferViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
