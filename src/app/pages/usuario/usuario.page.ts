import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UsuarioPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private usuariosService: UsuariosService) { }
  usuarios: UsuariosInterface[] = []
  id: any
  finalId: any

  ngOnInit() {
    // A esta actual ruta, tome el id
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.finalId = this.id - 1
  }

}
