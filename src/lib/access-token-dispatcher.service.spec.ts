import { TestBed } from '@angular/core/testing';

import { AccessTokenDispatcherService } from './access-token-dispatcher.service';

describe('AccessTokenDispatcherService', () => {
  let service: AccessTokenDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessTokenDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
