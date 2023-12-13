import { Component } from '@angular/core';
import { IonToast, IonHeader, IonContent, IonGrid, IonRow, IonCard, IonCardContent, IonInput, IonCol, IonCheckbox, IonButton, IonList, IonItem, IonListHeader, IonLabel, IonDatetimeButton, IonModal, IonDatetime } from '@ionic/angular/standalone';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { WorkTime } from '../models/workTime.model';
import { DatabaseService } from '../services/database.service';
import { DateHelpersService } from '../services/date-helpers.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    ToolbarComponent,
    IonHeader,
    IonContent,
    IonGrid,
    IonRow,
    IonCard,
    IonCardContent,
    IonInput,
    IonCol,
    IonCheckbox,
    IonButton,
    IonList,
    IonItem,
    FormsModule,
    IonListHeader,
    IonLabel,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonToast
  ],
})
export class Tab1Page {
  vacation = false;
  sickLeave = false;
  date;
  start;
  end;
  isToastOpen = false;
  toastMsg = "";

  constructor(
    private databaseService: DatabaseService,
    private dateHelper: DateHelpersService,
  ) {
    const currentDate = this.dateHelper.getIsoDate().slice(0, 19)
    this.date = currentDate;
    this.start = currentDate;
    this.end = currentDate;
  }

  async onSubmit() {
    this.toastMsg = "Success";
    let started = new Date(this.start);
    let finished = new Date(this.end);
    if (started >= finished) {
      this.toastMsg = "Wrong entry"
      this.isToastOpen = true;
      return;
    }
    await this.databaseService.createWorkTime(
      this.createWorkTimeObject(started, finished)
    );
    this.isToastOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  private createWorkTimeObject(started: Date, finished: Date): WorkTime {
    return {
      date: new Date(this.date).getTime(),
      started: started.getTime(),
      finished: finished.getTime(),
      work_time: this.dateHelper.calculateHourDifference(started, finished),
      sick_leave: this.sickLeave,
      vacation: this.vacation
    }
  }
}
