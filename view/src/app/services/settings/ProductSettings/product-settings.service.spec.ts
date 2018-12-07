import { TestBed, inject } from '@angular/core/testing';

import { ProductSettingsService } from './product-settings.service';

describe('ProductSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSettingsService]
    });
  });

  it('should be created', inject([ProductSettingsService], (service: ProductSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
