import { TestBed } from '@angular/core/testing';

import { PaisServicioService } from './pais-servicio.service';

describe('PaisServicioService', () => {
  let service: PaisServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
