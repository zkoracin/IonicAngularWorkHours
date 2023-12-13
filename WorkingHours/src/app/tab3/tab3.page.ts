import { Component } from '@angular/core';
import { IonToast, IonIcon, IonList, IonListHeader, IonItem, IonHeader, IonContent, IonButton, IonLabel, IonDatetimeButton, IonModal, IonDatetime } from '@ionic/angular/standalone';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { XlsxService } from '../services/xlsx.service';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { cloudDownload} from 'ionicons/icons';
import { DateHelpersService } from '../services/date-helpers.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    ToolbarComponent,
    IonHeader,
    IonContent,
    IonButton,
    IonLabel,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    FormsModule,
    IonList,
    IonListHeader,
    IonItem,
    IonIcon,
    IonToast
  ],
})
export class Tab3Page {

  date;
  isToastOpen = false;
  toastMsg = '';

  constructor(
    private xlsxService: XlsxService,
    private dateHelper: DateHelpersService,
  ) {
    addIcons({ cloudDownload });
    this.date = this.dateHelper.getIsoDate();
  }

  onChange(event: any) {
    this.date = event.detail.value;
  }

  async onDownload() {
    this.toastMsg = 'File downloaded';
    const result = await this.xlsxService.exportDataToExcel(this.date);
    if (!result) {
      this.toastMsg = 'No entries for this month';
    }
    this.isToastOpen = true;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
