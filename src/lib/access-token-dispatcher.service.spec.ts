import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AccessTokenDispatcherService } from './access-token-dispatcher.service';
import { NGX_OAUTH2_ACCESS_TOKEN_PROVIDERS } from './providers';
import {
  AccessTokenDispatcherConfig,
  ACCESS_TOKEN_DISPATCHER_CONFIG,
  Oauth2ClientConfig,
  OAUTH2_CLIENT_CONFIG,
} from './types';

const oauth2ClientConfig: Oauth2ClientConfig = {
  clientId: 'web-app',
  clientSecret: null,
  accessTokenUrl: 'http://localhost:8080/v2/token',
  authorizationCodeUrl: 'http://localhost:8080/authorize/consent',
  clientCredentialsInParams: false,
};

const accessTokenDispatcherConfig: AccessTokenDispatcherConfig = {
  name: 'oauth2',
  debug: false,
};

describe('AccessTokenDispatcherService', () => {
  let service: AccessTokenDispatcherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ...NGX_OAUTH2_ACCESS_TOKEN_PROVIDERS,
        { provide: OAUTH2_CLIENT_CONFIG, useValue: oauth2ClientConfig },
        {
          provide: ACCESS_TOKEN_DISPATCHER_CONFIG,
          useValue: accessTokenDispatcherConfig,
        },
      ],
    });
    service = TestBed.inject(AccessTokenDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
