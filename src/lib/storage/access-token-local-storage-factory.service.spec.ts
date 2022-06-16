import { TestBed } from '@angular/core/testing';

import { AccessTokenLocalStorageFactoryService } from './access-token-local-storage-factory.service';

xdescribe('AccessTokenLocalStorageFactoryService', () => {
  let service: AccessTokenLocalStorageFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessTokenLocalStorageFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
