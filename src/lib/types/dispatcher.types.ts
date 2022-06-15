import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessToken } from './standard.types';

export type ScopesType = [string, ...string[]];

export type AccessTokenWithType = {
  token_type: string;
  access_token: string;
};

export const EXTERNAL_SOURCE_ACCESS_TOKEN = new InjectionToken<
  Observable<AccessToken>
>('external-source-access-token');
