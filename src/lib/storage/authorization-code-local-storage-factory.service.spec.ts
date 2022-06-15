import { TestBed } from '@angular/core/testing';

import { AuthorizationCodeLocalStorageService } from './authorization-code-local-storage-factory.service';

describe('AuthorizationCodeLocalStorageService', () => {
  let service: AuthorizationCodeLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationCodeLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
