import { TestBed } from '@angular/core/testing';

import { Oauth2Client } from './oauth2.client';

xdescribe('Oauth2Client', () => {
  let service: Oauth2Client;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth2Client);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
