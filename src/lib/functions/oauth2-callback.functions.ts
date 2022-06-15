import { ActivatedRoute } from '@angular/router';
import { defer, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthorizationCodeDispatcherService } from '../authorization-code-dispatcher.service';
import { StateActionDispatcherService } from '../state-action-dispatcher.service';

export class BadRequestCallbackError extends Error {
  constructor(message: string = 'Bad request to callback.') {
    super(message);

    this.name = this.constructor.name;
  }
}

const badRequestCallbackErrorFactory = () => new BadRequestCallbackError();

export function oauth2Callback(
  route: ActivatedRoute,
  authorizationCodeDispatcher: AuthorizationCodeDispatcherService,
  stateActionDispatcher: StateActionDispatcherService,
): Observable<any> {
  const queryParamMap = route.snapshot.queryParamMap;

  return defer(() => {
    const stateId = queryParamMap.get('state');

    if (stateId === null) {
      return throwError(badRequestCallbackErrorFactory);
    }

    return of(stateId);
  }).pipe(
    switchMap((stateId) => {
      return authorizationCodeDispatcher
        .verifyState(stateId)
        .pipe(map((stateData) => [stateId, stateData] as const));
    }),
    switchMap(([stateId, stateData]) => {
      if (queryParamMap.has('error')) {
        const errorObject = {
          error: queryParamMap.get('error'),
          error_description: queryParamMap.get('error_description'),
        };

        if (queryParamMap.get('error') === 'access_denied') {
          return authorizationCodeDispatcher
            .clearState(stateId)
            .pipe(switchMap(() => throwError(() => errorObject)));
        }

        return throwError(() => errorObject);
      }

      const code = queryParamMap.get('code');

      if (code === null) {
        return throwError(badRequestCallbackErrorFactory);
      }

      return authorizationCodeDispatcher
        .exchangeAuthorizationCode(stateId, stateData, code)
        .pipe(map((accessToken) => [stateData, accessToken] as const));
    }),
    switchMap(([stateData, accessToken]) =>
      stateActionDispatcher.dispatch(stateData, accessToken),
    ),
  );
}
