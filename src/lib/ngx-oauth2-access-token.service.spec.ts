import { TestBed } from '@angular/core/testing';

import { NgxOauth2AccessTokenService } from './ngx-oauth2-access-token.service';

describe('NgxOauth2AccessTokenService', () => {
  let service: NgxOauth2AccessTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxOauth2AccessTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
