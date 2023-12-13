import { Component, effect } from '@angular/core';
import { IonHeader, IonContent, IonList, IonLabel, IonItem, IonListHeader, IonNote, IonText, IonModal, IonDatetimeButton, IonDatetime } from '@ionic/angular/standalone';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DatabaseService } from '../services/database.service';
import { WorkTime } from '../models/workTime.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultDisplayComponent } from '../result-display/result-display.component';
import { DateHelpersService } from '../services/date-helpers.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    ToolbarComponent,
    IonHeader,
    IonContent,
    IonList,
    IonLabel,
    IonItem,
    IonListHeader,
    IonText,
    IonNote,
    DatePipe,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    FormsModule,
    ResultDisplayComponent,
  ]
})
export class Tab2Page {

  workEntries: WorkTime[] = [];
  month;
  workTimeSum: any;
  constructor(
    private databaseService: DatabaseService,
    private dateHelper: DateHelpersService,
  ) {
    this.month = this.dateHelper.getIsoDate();
    effect(async () => {
      this.workTimeSum = this.databaseService.sumWorkTimes();
    });
  }

  async onChange(event: any) {
    const date = event.detail.value;
    await this.databaseService.fetchSelectedWorkTimes(date);
    await this.databaseService.fetchSumByMonth(date);
  }
}
