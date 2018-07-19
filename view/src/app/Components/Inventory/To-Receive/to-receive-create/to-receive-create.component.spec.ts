import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReceiveCreateComponent } from './to-receive-create.component';

describe('ToReceiveCreateComponent', () => {
  let component: ToReceiveCreateComponent;
  let fixture: ComponentFixture<ToReceiveCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToReceiveCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReceiveCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
