import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReceiveListComponent } from './to-receive-list.component';

describe('ToReceiveListComponent', () => {
  let component: ToReceiveListComponent;
  let fixture: ComponentFixture<ToReceiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToReceiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReceiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
