import { Injectable, signal } from '@angular/core';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';

@Injectable({
  providedIn: 'root'
})
export class CacheWebClosterService {
  // Guardar caché de usuariosWebCloster
  private usuariosWebClosterCache = signal<UsuariosWebClosterInterface[]>([]);

  // Validar la caché
  private cacheValido = signal<boolean>(false);

  // Obtener usuariosWebCloster de la caché
  getUsuariosWebCloster(){
    return this.usuariosWebClosterCache();
  }

  // Actualizar caché de usuariosWebCloster
  setUsuariosWebCloster(usuariosWebCloster: UsuariosWebClosterInterface[]){
    this.usuariosWebClosterCache.set(usuariosWebCloster);
    this.cacheValido.set(true);
  }

  // Verificar si el caché es valido
  isCacheValido(){
    return this.cacheValido();
  }

  // Invalida el caché (cuando agregas/editas/eliminas usuariosWebCloster)
  invalidarCache() {
    this.cacheValido.set(false);
  }
}
