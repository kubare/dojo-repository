import { TestBed } from '@angular/core/testing';

import { FavIceCreamsUserService } from './fav-ice-creams-user.service';

describe('FavIceCreamsUserService', () => {
  let service: FavIceCreamsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavIceCreamsUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
