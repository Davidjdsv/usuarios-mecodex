import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  ToastController,
} from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  // Variables para el formulario
  usuario = signal<string>('');
  clave = signal<string>('');
  loading = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async loginUsuario(usuario: string, clave: string) {
    this.authService.loginUsuarioService(usuario, clave).subscribe({
      next: async (response) => {
        if (response.success) {
          this.loading.set(true);

          // * 1. Se valida si el usuario está activo
          if (this.authService.isActivo()) {
            // ? Si el usuario SI ESTÁ ACTIVO, el paso siguiente es verificar si cuenta con los permisos para acceder a la plataforma
            // * 3. Si el usuario tiene permisos de administrador, se redirige a la página de inicio
            if (this.authService.getPermisosUsuario().includes(9)) {
              console.log(this.authService.getPermisosUsuario().includes(9));
              this.router.navigate(['/inicio']);
              await this.successAccess('Inicio de sesión exitoso');
            } else {
              // * 4. Si el usuario no tiene permisos de administrador, se redirige a la página de usuarios
              this.router.navigate(['/usuarios']);
              await this.successAccess('Inicio de sesión exitoso');
            }
          } else {
            // * 2. Si el usuario no está activo, se muestra un mensaje de error
            await this.errorAccess('El usuario no está activo');
          }
          this.authService.actualizarRol();
        }
      },
      error: async () => {
        await this.errorAccess('Usuario o contraseña incorrectos');
      },
    });
  }

  async successAccess(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'medium',
    });
    await toast.present();
  }

  async errorAccess(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
  }

  logOut() {
    this.authService.logOut();
  }
}
