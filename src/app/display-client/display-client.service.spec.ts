import { TestBed } from '@angular/core/testing';

import { DisplayClientService } from './display-client.service';

describe('DisplayClientServiceService', () => {
  let service: DisplayClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
