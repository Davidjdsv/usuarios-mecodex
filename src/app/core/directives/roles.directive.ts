import { Directive, TemplateRef, ViewContainerRef, inject, input } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { UsuariosWebClosterInterface } from '../../models/usuarios-web-closter-interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appRoles]',
  standalone: true
})
export class RolesDirective {
  private user = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  roles = input.required<UsuariosWebClosterInterface[]>({
    alias: 'appRoles'
  })


}
