import { TestBed } from '@angular/core/testing';

import { SpellCheckerClientService } from './spell-checker-client.service';

describe('SpellCheckerClientService', () => {
  let service: SpellCheckerClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellCheckerClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
