import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { SqliteService } from './services/sqlite.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private databaseService: DatabaseService,
    private sqliteService: SqliteService,
  ) {}

  async ngOnInit() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      try {
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }
        await this.databaseService.openDatabase();
        await this.databaseService.createTables();
      } catch (error) {
        console.log(`initializeAppError: ${error}`);
      }
    });
  }
}
