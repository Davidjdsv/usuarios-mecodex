import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  effect,
} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[directivePermisos]',
  standalone: true,
})
export class PermisosDirective {

  // ? Se inyectan servicios

  // * Se obtiene el valor del usuario actual
  private user = toSignal<UsuariosWebClosterInterface | null>(
    inject(AuthService).rolUsuarioLogeado$
  )

  // INYECCIONES NECESARIAS PARA MANIPULAR EL DOM:
  // TemplateRef: Referencia al contenido HTML que está dentro de la directiva
  private templateRef = inject(TemplateRef); 
  // ViewContainerRef: Contenedor donde se inserta o elimina el contenido
  private viewContainerRef = inject(ViewContainerRef);

  // Obtiene los permisos por el id
  permisosRequeridos = input.required<number[]>({
    alias: "directivePermisos"
  })

  constructor(){
    effect(() => {

      const user = this.user();
      const permisos = this.permisosRequeridos()

      this.viewContainerRef.clear()

      if(user && permisos.length > 0 && this.tienePermisos(user, permisos)){
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      }
    })
  }

  /**
   * LÓGICA DE VERIFICACIÓN DE PERMISOS
   * @param usuario - El usuario actual (VIENE DE: AuthService.getCurrentData())
   *                  Contiene propiedad 'permisos: number[]' con IDs de permisos
   * @param permisosRequeridos - Array de IDs de permisos necesarios. Ej:[1, 5, 9]
   *                              VIENE DE: El HTML donde se usa la directiva
   * @returns true si el usuario tiene AL MENOS UNO de los permisos requeridos
   * EJEMPLO:
   * - usuario.permisos = [1, 2, 3, 5, 6, 7, 8, 9] (permisos del usuario)
   * - permisosRequeridos = [5, 100] (permisos necesarios)
   * - RESULTADO: true (porque tiene el permiso 5)
   */
  tienePermisos(usuario: UsuariosWebClosterInterface, permisosRequeridos: number[]): boolean{
    return permisosRequeridos.some((permisoId) => usuario.permisos.includes(permisoId))
  }
}
