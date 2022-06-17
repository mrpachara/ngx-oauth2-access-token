import { Injectable } from '@angular/core';
import { filter, map, Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private readonly transToStorage = <T = any>(value: T | null): string => {
    return JSON.stringify(value);
  };

  private readonly transToValue = <T = any>(value: string | null): T | null => {
    return Object.freeze(JSON.parse(value ?? 'null'));
  };

  private readonly newTransformerPipe = <T = any>(key: string) => {
    return pipe(
      filter(
        (storageEvent: StorageEvent) =>
          storageEvent.key === null || storageEvent.key === key,
      ),
      map((storageEvent: StorageEvent) => storageEvent.newValue),
      map(this.transToValue as () => T | null),
    );
  };

  // NOTE: storageEvent$ act as both Subject and Observable,
  //       cause Subject inherit Observable.
  private readonly storageEvent$ = new Subject<StorageEvent>();

  private readonly keyObservableMap = new Map<string, Observable<any>>();

  constructor() {
    addEventListener('storage', (storageEvent) => {
      this.storageEvent$.next(storageEvent);
    });
  }

  loadItem<T = any>(key: string): T | null {
    return this.transToValue(localStorage.getItem(key));
  }

  storeItem<T = any>(key: string, value: T): T {
    localStorage.setItem(key, this.transToStorage(value));

    return value;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  watchItem<T = any>(key: string): Observable<T | null> {
    if (!this.keyObservableMap.has(key)) {
      this.keyObservableMap.set(
        key,
        this.storageEvent$.pipe(this.newTransformerPipe(key)),
      );
    }

    return this.keyObservableMap.get(key)!;
  }

  keys(): string[] {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i)!);
    }

    return keys;
  }
}
