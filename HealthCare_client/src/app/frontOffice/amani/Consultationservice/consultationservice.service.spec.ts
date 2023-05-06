import { TestBed } from '@angular/core/testing';

import { ConsultationserviceService } from './consultationservice.service';

describe('ConsultationserviceService', () => {
  let service: ConsultationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
