import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AccessTokenService } from './access-token.service';
import { NGX_OAUTH2_ACCESS_TOKEN_PROVIDERS } from './providers';
import { ACCESS_TOKEN_SERVICE_CONFIG, OAUTH2_CLIENT_CONFIG } from './tokens';
import { AccessTokenServiceConfig, Oauth2ClientConfig } from './types';

const oauth2ClientConfig: Oauth2ClientConfig = {
  clientId: 'web-app',
  clientSecret: null,
  accessTokenUrl: 'http://localhost:8080/v2/token',
  authorizationCodeUrl: 'http://localhost:8080/authorize/consent',
  clientCredentialsInParams: false,
};

const accessTokenConfig: AccessTokenServiceConfig = {
  name: 'oauth2',
  debug: false,
};

describe('AccessTokenService', () => {
  let service: AccessTokenService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ...NGX_OAUTH2_ACCESS_TOKEN_PROVIDERS,
        { provide: OAUTH2_CLIENT_CONFIG, useValue: oauth2ClientConfig },
        {
          provide: ACCESS_TOKEN_SERVICE_CONFIG,
          useValue: accessTokenConfig,
        },
      ],
    });
    service = TestBed.inject(AccessTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
