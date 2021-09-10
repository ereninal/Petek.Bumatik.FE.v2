import { TestBed } from '@angular/core/testing';

import { AutomatService } from './automat.service';

describe('AutomatService', () => {
  let service: AutomatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
