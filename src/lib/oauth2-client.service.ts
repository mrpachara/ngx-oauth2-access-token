import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  FactoryProvider,
  Inject,
  Injectable,
  InjectionToken,
} from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

import {
  AccessToken,
  AuthorizationCodeParams,
  Oauth2ClientConfig,
  OAUTH2_CLIENT_CONFIG,
  SKIP_ASSIGNING_ACCESS_TOKEN,
  StandardGrantsParams,
} from './types';

export function createOauth2ClientProvider(
  providedToken:
    | InjectionToken<Oauth2ClientService>
    | typeof Oauth2ClientService,
  config: Oauth2ClientConfig,
): FactoryProvider {
  return {
    provide: providedToken,
    useFactory: (httpClient: HttpClient): Oauth2ClientService =>
      new Oauth2ClientService(config, httpClient),
    deps: [HttpClient],
  };
}

@Injectable({
  providedIn: 'root',
})
export class Oauth2ClientService {
  constructor(
    @Inject(OAUTH2_CLIENT_CONFIG) private readonly config: Oauth2ClientConfig,
    private readonly http: HttpClient,
  ) {}

  private generateClientHeader(): { Authorization: string } {
    const authData = btoa(
      `${this.config.clientId}:${this.config.clientSecret}`,
    );

    return {
      Authorization: `Basic ${authData}`,
    };
  }

  private generateClientParam(): {
    client_id: string;
    client_secret?: string;
  } {
    return {
      client_id: this.config.clientId,
      ...(this.config.clientSecret
        ? { client_secret: this.config.clientSecret }
        : {}),
    };
  }

  public requestAccessToken<T = StandardGrantsParams>(
    params: T,
  ): Observable<AccessToken> {
    return this.http
      .post<AccessToken>(
        this.config.accessTokenUrl,
        {
          ...params,
          ...(this.config.clientCredentialsInParams
            ? this.generateClientParam()
            : {}),
        },
        {
          context: new HttpContext().set(SKIP_ASSIGNING_ACCESS_TOKEN, true),
          headers: {
            ...(!this.config.clientCredentialsInParams
              ? this.generateClientHeader()
              : {}),
          },
        },
      )
      .pipe(
        catchError((err: unknown) => {
          if (err instanceof HttpErrorResponse && err.error) {
            return throwError(() => err.error);
          }

          return throwError(() => err);
        }),
      );
  }

  public generateAuthorizationCodeUrl<T = AuthorizationCodeParams>(
    params: T,
  ): Observable<URL> {
    const httpParams = new URLSearchParams({
      ...params,
      ...this.generateClientParam(),
    });

    return of(new URL(`${this.config.authorizationCodeUrl}?${httpParams}`));
  }
}
