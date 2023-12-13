import { Injectable, signal } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { WorkTime, WorkTimeSum } from '../models/workTime.model';
import { DateHelpersService } from './date-helpers.service';
import { MOCK_WORK_TIME } from '../mock-data/date-entries';


const DB = 'workingHours';

const CREATE_TABLE_WORK_HOURS = `
  CREATE TABLE IF NOT EXISTS work_hours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date INTEGER NOT NULL,
    started INTEGER NOT NULL,
    finished INTEGER NOT NULL,
    work_time INTEGER NOT NULL,
    sick_leave BOOLEAN NOT NULL,
    vacation BOOLEAN NOT NULL
  );`

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: SQLiteDBConnection;
  
  workTimes = signal<WorkTime[]>([]);
  sumWorkTimes = signal<WorkTimeSum>({
    sum_sick_leave: 0,
    sum_vacation: 0,
    sum_work_time: 0
  });
  
  constructor(
    private sqliteService: SqliteService,
    private dateHelper: DateHelpersService,
  ) { }

  async openDatabase() {
    this.db = await this.sqliteService.createConnection(DB);
    try {
      await this.db.open();
    } catch (error) {
      console.log(error);
    }
  }

  async createTables() {
    try {
      await this.db.execute(CREATE_TABLE_WORK_HOURS);
      await this.createInitData();
      await this.fetchData();
    } catch (error) {
      console.log(error)
    }
  }

  async createWorkTime(workHour: any) {
    const query = `INSERT INTO work_hours (date, started, finished, work_time, sick_leave, vacation)
      VALUES (${workHour.date}, ${workHour.started}, ${workHour.finished}, 
        ${workHour.work_time}, ${workHour.sick_leave}, ${workHour.vacation})`;
    await this.db.run(query);
    await this.fetchData(workHour.date);
  }

  async deleteWorkTime(id: number, date: number) { 
    const query = `DELETE FROM work_hours WHERE id = ${id}`;
    await this.db.run(query);
    await this.fetchData(date);
  }

  async updateWorkTime(workHour: WorkTime) {
    const query = `UPDATE work_hours SET date = ${workHour.date}, started = ${workHour.started},
    finished = ${workHour.finished}, work_time = ${workHour.work_time}, vacation = ${workHour.vacation}, sick_leave = ${workHour.sick_leave}
    WHERE id = ${workHour.id}`;
    await this.db.run(query);
    await this.fetchData(workHour.date);
  }

  async fetchSelectedWorkTimes(param: string) {
    const query = `
      SELECT * FROM work_hours
      WHERE strftime('%Y-%m', datetime(date / 1000, 'unixepoch')) = strftime('%Y-%m', ?);
    `;
    const result = (await this.db.query(query, [param])).values as WorkTime[];
    this.workTimes.set(result);
  }

  async fetchSumByMonth(param: string) {
    const query = `SELECT 
    SUM(CASE WHEN sick_leave = 1 THEN work_time ELSE 0 END) AS sum_sick_leave,
    SUM(CASE WHEN vacation = 1 THEN work_time ELSE 0 END) AS sum_vacation,
    SUM(CASE WHEN sick_leave = 0 AND vacation = 0 THEN work_time ELSE 0 END) AS sum_work_time
    FROM work_hours
    WHERE (sick_leave = 1 OR vacation = 1 OR (sick_leave = 0 AND vacation = 0))
    AND strftime('%Y-%m', datetime(date / 1000, 'unixepoch')) = strftime('%Y-%m', ?);
    `;
    const result = (await this.db.query(query, [param])).values![0] as WorkTimeSum;
    if (!result.sum_sick_leave) result.sum_sick_leave = 0;
    if (!result.sum_vacation) result.sum_vacation = 0;
    if (!result.sum_work_time) result.sum_work_time = 0;
    this.sumWorkTimes.set(result);
  }

  async fetchAll(date: string) {
    const query = `
      SELECT
      strftime("%Y-%m-%d", datetime(date / 1000, 'unixepoch')) AS datum,
      work_time as stevilo_ur,
      sick_leave AS bolniska,
      vacation AS dopust
      FROM work_hours
      WHERE strftime('%Y-%m', datetime(date / 1000, 'unixepoch')) = strftime('%Y-%m', ?);
      `;
    return (await this.db.query(query, [date])).values!;
  }

  private async fetchData(param?: number) {
    const date = this.dateHelper.getIsoDate(param);
    await this.fetchSelectedWorkTimes(date);
    await this.fetchSumByMonth(date);
  }

  private async createInitData() {
    for (const element of MOCK_WORK_TIME) {
      await this.createWorkTime(element);
    }
  }  
}
