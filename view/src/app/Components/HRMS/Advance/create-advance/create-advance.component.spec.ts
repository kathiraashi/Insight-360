import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvanceComponent } from './create-advance.component';

describe('CreateAdvanceComponent', () => {
  let component: CreateAdvanceComponent;
  let fixture: ComponentFixture<CreateAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
