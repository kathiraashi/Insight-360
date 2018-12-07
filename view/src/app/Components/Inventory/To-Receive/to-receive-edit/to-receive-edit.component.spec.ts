import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReceiveEditComponent } from './to-receive-edit.component';

describe('ToReceiveEditComponent', () => {
  let component: ToReceiveEditComponent;
  let fixture: ComponentFixture<ToReceiveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToReceiveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReceiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
