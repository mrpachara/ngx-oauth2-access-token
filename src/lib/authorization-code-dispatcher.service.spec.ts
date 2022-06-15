import { TestBed } from '@angular/core/testing';

import { AuthorizationCodeDispatcherService } from './authorization-code-dispatcher.service';

describe('AuthorizationCodeDispatcherService', () => {
  let service: AuthorizationCodeDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationCodeDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
