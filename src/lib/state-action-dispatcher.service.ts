import { Inject, Injectable } from '@angular/core';
import { defer, from, Observable, of, throwError } from 'rxjs';
import {
  AccessToken,
  StateAction,
  StateActionHandlers,
  STATE_ACTION_HANDLERS,
} from './types';

export class StateActionNotFoundError extends Error {
  constructor(
    actionName: string,
    message: string = 'State action %s is not found in STATE_ACTION_HANDLERS.',
  ) {
    super(message.replace(/\%s/, actionName));
  }
}

@Injectable({
  providedIn: 'root',
})
export class StateActionDispatcherService {
  private readonly extract = (actionValue: string) => actionValue.split(':', 2);

  private readonly handlers: StateActionHandlers;
  constructor(
    @Inject(STATE_ACTION_HANDLERS)
    handlers: StateActionHandlers,
  ) {
    this.handlers = { ...handlers };
  }

  dispatch(
    stateAction: StateAction,
    accessToken: AccessToken,
  ): Observable<any> {
    if (!stateAction.action) {
      return of(false);
    }

    const [action, value] = this.extract(stateAction.action);

    return defer(() => {
      if (!this.handlers[action]) {
        return throwError(() => new StateActionNotFoundError(action));
      }

      const result = this.handlers[action](value, accessToken);

      if (result === undefined) {
        return of(true);
      } else if (result instanceof Promise) {
        return from(result);
      } else if (result instanceof Observable) {
        return result;
      } else {
        return of(result);
      }
    });
  }
}
