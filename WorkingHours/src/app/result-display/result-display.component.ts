import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { IonItem, IonLabel, IonNote, ModalController } from '@ionic/angular/standalone';
import { WorkTime } from '../models/workTime.model';
import { UpdateTimeComponent } from '../modals/update-time/update-time.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonNote,
    DatePipe,
  ]
})
export class ResultDisplayComponent {

  constructor(
    private modalCtrl: ModalController,
    public databaseService: DatabaseService,
  ) { }


  async onResultSelect(result: WorkTime) {
    const modal = await this.modalCtrl.create({
      component: UpdateTimeComponent,
      componentProps: {
        data: result,
      },
    });
    await modal.present();
  }

}
