import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermissionsComponent } from './list-permissions.component';

describe('ListPermissionsComponent', () => {
  let component: ListPermissionsComponent;
  let fixture: ComponentFixture<ListPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
