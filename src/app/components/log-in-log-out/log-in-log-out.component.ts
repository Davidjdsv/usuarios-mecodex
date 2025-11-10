import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonButton, IonIcon, IonTitle, IonHeader, IonContent, IonFooter, IonToolbar, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-log-in-log-out',
  templateUrl: './log-in-log-out.component.html',
  styleUrls: ['./log-in-log-out.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonTitle,
    IonHeader,
    IonContent,
    IonFooter,
    IonToolbar,
    IonButtons
  ],
})
export class LogInLogOutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
