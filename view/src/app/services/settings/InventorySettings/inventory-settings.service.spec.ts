import { TestBed, inject } from '@angular/core/testing';

import { InventorySettingsService } from './inventory-settings.service';

describe('InventorySettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventorySettingsService]
    });
  });

  it('should be created', inject([InventorySettingsService], (service: InventorySettingsService) => {
    expect(service).toBeTruthy();
  }));
});
