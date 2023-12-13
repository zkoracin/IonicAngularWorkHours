import { Injectable } from '@angular/core';
import { CapacitorSQLite, CapacitorSQLitePlugin, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  sqliteConnection!: SQLiteConnection;
  isService: boolean = false;
  platform!: string;
  sqlitePlugin!: CapacitorSQLitePlugin;
  native: boolean = false;

  constructor() { }

  async initializePlugin(): Promise<boolean> {
    this.platform = Capacitor.getPlatform();
        if(this.platform === 'ios' || this.platform === 'android') this.native = true;
        this.sqlitePlugin = CapacitorSQLite;
        this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
        this.isService = true;
        return true;
}

  async createConnection(db: string) {
    const consistency = (await this.sqliteConnection.checkConnectionsConsistency()).result;
    const connection = (await this.sqliteConnection.isConnection(db, false)).result;
    if (!consistency && !connection) {
      return await this.sqliteConnection.createConnection(db, false, 'no-encryption', 1, false );
    }
    return await this.sqliteConnection.retrieveConnection(db, false);
  }

  async closeConnection(db: string) {
    return await this.sqliteConnection.closeConnection(db, false);
  }

  async initWebStore() {
    try {
      await this.sqliteConnection.initWebStore();
    } catch(err: any) {
      return Promise.reject(`initWebStore: ${err}`);
    }
  }

  
}
