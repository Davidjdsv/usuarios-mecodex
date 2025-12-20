import { Injectable, signal } from '@angular/core';
import { CuentaInterface } from 'src/app/models/cuenta-interface';

@Injectable({
  providedIn: 'root'
})
export class CacheCuentaService {
  private cuentaCache = signal<CuentaInterface[]>([]);

  private cacheValido = signal<boolean>(false);

  getCuentas(){
    return this.cuentaCache();
  }

  setCuentas(cuentas: CuentaInterface[]){
    this.cuentaCache.set(cuentas);
    this.cacheValido.set(true);
  }

  isCacheValido(){
    return this.cacheValido();
  }

  invalidarCache() {
    this.cacheValido.set(false);
  }
}
