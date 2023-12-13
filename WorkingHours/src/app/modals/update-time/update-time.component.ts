import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon, ModalController,IonToolbar, IonTitle, IonButtons, IonToast, IonHeader, IonContent, IonGrid, IonRow, IonCard, IonCardContent, IonInput, IonCol, IonCheckbox, IonButton, IonList, IonItem, IonListHeader, IonLabel, IonDatetimeButton, IonModal, IonDatetime } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { WorkTime } from 'src/app/models/workTime.model';
import { DatabaseService } from 'src/app/services/database.service';
import { DateHelpersService } from 'src/app/services/date-helpers.service';

@Component({
  selector: 'app-update-time',
  templateUrl: './update-time.component.html',
  styleUrls: ['./update-time.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonItem,
    IonCheckbox,
    IonToast,
    FormsModule,
    IonInput,
    IonLabel,
    IonDatetimeButton,
    IonModal,
    IonListHeader,
    IonList,
    IonDatetime,
    IonIcon,
  ],
  providers: [DatePipe]
})
export class UpdateTimeComponent implements OnInit{
  data!: WorkTime;
  isToastOpen = false;
  toastMsg = '';
  started?: string;
  finished?: string;

  constructor(
    private modalCtrl: ModalController,
    private databaseService: DatabaseService,
    private datePipe: DatePipe,
    private dateHelper: DateHelpersService,
  ) {
    addIcons({ trash });
   }

  ngOnInit(): void {
    this.started = this.datePipe.transform(this.data.started, 'yyyy-MM-ddTHH:mm')!;
    this.finished = this.datePipe.transform(this.data.finished, 'yyyy-MM-ddTHH:mm')!;
  }

  async onDelete(id: number) {
    await this.databaseService.deleteWorkTime(id, this.data.date);
    this.onCancel();
  }

  async onCancel() {
    await this.modalCtrl.dismiss();
  }

  async onSubmit() {
    this.toastMsg = 'Update finished'
    const started = new Date(this.started!);
    const finished = new Date(this.finished!);
    if (started >= finished) {
      this.toastMsg = 'Wrong entry';
      this.isToastOpen = true;
      return;
    }
    this.data.started = started.getTime();
    this.data.finished = finished.getTime();
    this.data.work_time = this.dateHelper.calculateHourDifference(started, finished),
    await this.databaseService.updateWorkTime(this.data);
    this.isToastOpen = true;
  }
  
  async setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
    await this.onCancel();
  }
}
