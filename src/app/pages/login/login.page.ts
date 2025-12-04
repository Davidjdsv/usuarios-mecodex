import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
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
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth-service/auth.service';

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
  usuario: string = '';
  clave: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {}


  async loginUsuario(usuario: string, clave: string){
    this.loading = true;
    this.authService.loginUsuarioService(usuario, clave).subscribe({
      next: async (response) => {
        this.loading = false;
        if (response.success) {
          this.router.navigate(['/inicio']);
          
          const toast = await this.toastController.create({
            message: "Inicio de sesión exitoso",
            duration: 2000,
            color: "medium",
          })
          await toast.present();

        } else {
          console.error('Error de autenticación:', response.message);
        }
      },
      error: async (error) => {
        console.error('Error en la solicitud:', error);
        const toast = await this.toastController.create({
          message: "Usuario o contraseña incorrectos",
          duration: 2000,
          color: "danger",
        })
        await toast.present();
      }
    });
  }

  logOut(){
    this.authService.logOut()
  }
}
