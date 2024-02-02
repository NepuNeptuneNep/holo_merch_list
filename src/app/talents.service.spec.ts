import { TestBed } from '@angular/core/testing';

import { Talent } from './talents.service';

describe('HololiveListingService', () => {
  let service: Talent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Talent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
