import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdvanceComponent } from './list-advance.component';

describe('ListAdvanceComponent', () => {
  let component: ListAdvanceComponent;
  let fixture: ComponentFixture<ListAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
