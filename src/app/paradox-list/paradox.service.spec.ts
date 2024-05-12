import { TestBed } from '@angular/core/testing';

import { ParadoxService } from './paradox.service';

describe('ParadoxService', () => {
  let service: ParadoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParadoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
