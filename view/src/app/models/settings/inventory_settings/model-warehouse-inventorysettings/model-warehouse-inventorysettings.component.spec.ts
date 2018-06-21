import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelWarehouseInventorysettingsComponent } from './model-warehouse-inventorysettings.component';

describe('ModelWarehouseInventorysettingsComponent', () => {
  let component: ModelWarehouseInventorysettingsComponent;
  let fixture: ComponentFixture<ModelWarehouseInventorysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelWarehouseInventorysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelWarehouseInventorysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
