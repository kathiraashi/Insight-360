import { TestBed, inject } from '@angular/core/testing';

import { HrmsService } from './hrms.service';

describe('HrmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrmsService]
    });
  });

  it('should be created', inject([HrmsService], (service: HrmsService) => {
    expect(service).toBeTruthy();
  }));
});
