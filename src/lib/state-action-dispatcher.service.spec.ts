import { TestBed } from '@angular/core/testing';

import { StateActionDispatcherService } from './state-action-dispatcher.service';

describe('OauthStateActionDispatcherService', () => {
  let service: StateActionDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateActionDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
