import { Component, Input, OnInit } from '@angular/core';
import { IonToolbar, IonTitle } from '@ionic/angular/standalone';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonTitle]
})
export class ToolbarComponent  implements OnInit {

  @Input() title!: string;
  @Input() size = 'undefined'

  constructor() { }

  ngOnInit() {}

}
