import { TestBed } from '@angular/core/testing';

import { KeydownService } from './keydown.service';

describe('KeydownService', () => {
  let service: KeydownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeydownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
