import { TestBed } from '@angular/core/testing';

import { AuthorizationCodeLocalStorageFactoryService } from './authorization-code-local-storage-factory.service';

xdescribe('AuthorizationCodeLocalStorageFactoryService', () => {
  let service: AuthorizationCodeLocalStorageFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationCodeLocalStorageFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
