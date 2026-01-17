import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  effect,
} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UsuariosWebClosterInterface } from '../../models/usuarios-web-closter-interface';
import { RolesInterface } from 'src/app/models/roles-interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[directivePermisos]',
  standalone: true,
})
export class RolesDirective {
  // obtiene el valor actual del observable como una señal reactiva
  private user = toSignal<UsuariosWebClosterInterface | null>(
    inject(AuthService).rolUsuarioLogeado$
  );
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  roles = input.required<RolesInterface[]>({
    alias: 'directivePermisos',
  });

  constructor() {
    effect(() => {
      const user = this.user();
      const roles = this.roles();
      console.log("el valor actual de la señal usuario es: ", user)
      this.viewContainerRef.clear();

      if (user && roles.length > 0 && this.hasRole(user, roles)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }

  private hasRole(user: UsuariosWebClosterInterface, allowedRoles: RolesInterface[]): boolean {
    return allowedRoles.some((role) => user.permisos.includes(role.id_rol));
  }
}
