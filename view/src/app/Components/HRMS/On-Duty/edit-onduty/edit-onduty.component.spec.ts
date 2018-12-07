import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOndutyComponent } from './edit-onduty.component';

describe('EditOndutyComponent', () => {
  let component: EditOndutyComponent;
  let fixture: ComponentFixture<EditOndutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOndutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOndutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
