import { TestBed } from '@angular/core/testing';

import { IceCreamsUserService } from './ice-creams-user.service';

describe('IceCreamsUserService', () => {
  let service: IceCreamsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IceCreamsUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
