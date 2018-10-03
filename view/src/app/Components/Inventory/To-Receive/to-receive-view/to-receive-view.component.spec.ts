import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReceiveViewComponent } from './to-receive-view.component';

describe('ToReceiveViewComponent', () => {
  let component: ToReceiveViewComponent;
  let fixture: ComponentFixture<ToReceiveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToReceiveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReceiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
