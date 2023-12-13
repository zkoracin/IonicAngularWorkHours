import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { utils, write } from 'xlsx';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  constructor(
    private databaseService: DatabaseService,
  ) { }

  async exportDataToExcel(date: string) {
    let data = await this.databaseService.fetchAll(date);
    if (!data.length) {
      return false;
    }
    data = this.mergeObjects(data);
    const ws = utils.json_to_sheet(
      data,
      { header: Object.keys(data[0])},
    );
    ws['!cols'] = [
      {wch: 12},
      {wch: 12},
      {wch: 12},
      {wch: 12}
    ];
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet 1');

   const xlsxBase64 = write(wb, { bookType: 'xlsx', type: 'base64' });

   const fileName = `${date.slice(0, 10)}-hours.xlsx`;

    await Filesystem.writeFile({
      path: fileName,
      data: xlsxBase64,
      directory: Directory.Documents,
    });
    return true;
  }

  private mergeObjects(data: any) {
    const mergedArray: any[] = [];
    data.forEach((element: any) => {
      mergedArray.push(element)
    });
    return mergedArray;
  }
}