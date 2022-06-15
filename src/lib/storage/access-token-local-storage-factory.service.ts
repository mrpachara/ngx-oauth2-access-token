import { Injectable } from '@angular/core';
import {
  defer,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  AccessTokenStorage,
  StoredAccessToken,
  AccessTokenStorageFactory,
} from '../types';
import { LocalStorageService } from './local-storage.service';

export class AccessTokenNotFoundError extends Error {
  constructor(message: string = 'Access token is not found.') {
    super(message);

    this.name = this.constructor.name;
  }
}

export class AccessTokenExpiredError extends Error {
  constructor(message: string = 'Access token has expired.') {
    super(message);

    this.name = this.constructor.name;
  }
}

export class RefreshTokenNotFoundError extends Error {
  constructor(message: string = 'Refresh token is not found.') {
    super(message);

    this.name = this.constructor.name;
  }
}

const accessTokenNotFoundErrorFactory = () => new AccessTokenNotFoundError();
const accessTokenExpiredErrorFactory = () => new AccessTokenExpiredError();
const refreshTokenNotFoundErrorFactory = () => new RefreshTokenNotFoundError();

const tokenDataKeyName = `oauth-token-data`;

class AccessTokenLocalStorage implements AccessTokenStorage {
  private stoageKey = (type: 'access-token' | 'refresh-token'): string =>
    `${this.name}-${tokenDataKeyName}-${type}`;

  private readonly accessToken$: Observable<StoredAccessToken | null>;

  constructor(
    private readonly name: string,
    private readonly storage: LocalStorageService,
  ) {
    this.accessToken$ = this.storage.watchItem<StoredAccessToken>(
      this.stoageKey('access-token'),
    );
  }

  loadAccessToken(): Observable<StoredAccessToken> {
    return defer(() => {
      return of(
        this.storage.loadItem<StoredAccessToken>(
          this.stoageKey('access-token'),
        ),
      ).pipe(
        switchMap((storedAccessToken) => {
          if (storedAccessToken === null) {
            return throwError(accessTokenNotFoundErrorFactory);
          }

          if (storedAccessToken.expires_at < Date.now()) {
            return throwError(accessTokenExpiredErrorFactory);
          }

          return of(storedAccessToken);
        }),
      );
    });
  }

  storeAccessToken(
    storedAccessToken: StoredAccessToken,
  ): Observable<StoredAccessToken> {
    return defer(() => {
      return of(
        this.storage.storeItem(
          this.stoageKey('access-token'),
          storedAccessToken,
        ),
      );
    });
  }

  removeAccessToken(): Observable<true> {
    return defer(() => {
      this.storage.removeItem(this.stoageKey('access-token'));

      return of(true as const);
    });
  }

  loadRefreshToken(): Observable<string> {
    return defer(() => {
      return of(
        this.storage.loadItem<string>(this.stoageKey('refresh-token')),
      ).pipe(
        switchMap((storedRefreshToken) => {
          if (storedRefreshToken === null) {
            return throwError(refreshTokenNotFoundErrorFactory);
          }

          return of(storedRefreshToken);
        }),
      );
    });
  }

  storeRefreshToken(refreshToken: string): Observable<string> {
    return defer(() => {
      return of(
        this.storage.storeItem(this.stoageKey('refresh-token'), refreshToken),
      );
    });
  }

  clearToken(): Observable<true> {
    return defer(() => {
      this.storage.removeItem(this.stoageKey('access-token'));
      this.storage.removeItem(this.stoageKey('refresh-token'));

      return of(true as const);
    });
  }

  watchAccessToken(): Observable<StoredAccessToken | null> {
    return this.accessToken$;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AccessTokenLocalStorageFactoryService
  implements AccessTokenStorageFactory
{
  constructor(private readonly storage: LocalStorageService) {}

  create(name: string): AccessTokenStorage {
    return new AccessTokenLocalStorage(name, this.storage);
  }
}
