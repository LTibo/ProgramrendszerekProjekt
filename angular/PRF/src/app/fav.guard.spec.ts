import { TestBed } from '@angular/core/testing';

import { FavGuard } from './fav.guard';

describe('FavGuard', () => {
  let guard: FavGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FavGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
