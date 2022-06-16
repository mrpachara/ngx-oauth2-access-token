import { TestBed } from '@angular/core/testing';

import { Oauth2ClientService } from './oauth2-client.service';

xdescribe('Oauth2ClientService', () => {
  let service: Oauth2ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth2ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
