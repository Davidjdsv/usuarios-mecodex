import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText, IonImg],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent  implements OnInit {
  @Input() message?: string // * Porque se puede pasar como párametro no solo para usuarios sino para otros componentes que lo necesiten
  @Input() firstValue?: string // * Porque se puede pasar como párametro no solo para usuarios sino para otros componentes que lo necesiten

  constructor() { }

  ngOnInit() {}

}
