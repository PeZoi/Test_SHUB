import * as XLSX from 'xlsx';
import { InformationStation } from '../models/InformationStation';
import { Transaction } from '../models/Transaction';
import dayjs from "dayjs";

interface ResponseData {
   info: InformationStation,
   data: Transaction[]
}

export const handleExcelData = (file: File | undefined): Promise<ResponseData> => {
   return new Promise((resolve, reject) => {
      if (!file) {
         return;
      }
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
         const data = new Uint8Array(e.target?.result as ArrayBuffer);
         const workbook = XLSX.read(data, { type: 'array' });
         const sheetName = workbook.SheetNames[0];
         const sheet = workbook.Sheets[sheetName];

         const rawData: never[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

         const transactions: Transaction[] = [];

         const informationStation: InformationStation = new InformationStation(rawData[2][1], rawData[4][1], rawData[5][1], rawData[2][4], rawData[4][4], rawData[5][4])

         for (let index = 8; index < rawData.length; index++) {

            const row = rawData[index];

            transactions.push({
               stt: row?.[0],
               ngay: row?.[1] || '',
               gio: row?.[2] || '',
               tram: row?.[3] || '',
               tru_bom: row?.[4] || '',
               mat_hang: row?.[5] || '',
               so_luong: row?.[6] || 0,
               don_gia: row?.[7] || 0,
               thanh_tien: row?.[8] || 0,
               trang_thai_TT: row?.[9] || '',
               ma_KH: row?.[10] || '',
               ten_KH: row?.[11] || '',
               loai_KH: row?.[12] || '',
               ngay_thanh_toan: row?.[13] || '',
               nhan_vien: row?.[14] || '',
               bien_so_xe: row?.[15] || '',
               trang_thai_HD: row?.[16] || ''

            });
         }

         resolve({ info: informationStation, data: transactions });
      };

      reader.onerror = (error) => {
         console.log("Error: " + error);
         reject(error);
      };
   });
};

export const compareTime = (timeFrom: dayjs.Dayjs, timeTo: dayjs.Dayjs, timeTarget: dayjs.Dayjs): boolean => {
   if (timeTarget.isSame(timeFrom) || timeTarget.isSame(timeTo)) {
      return true;
   }
   if (timeTarget.isAfter(timeFrom) && timeTarget.isBefore(timeTo)) {
      return true;
   }
   return false;
}

export const formatPrice = (price: number) => {
   return price.toString().split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
   })
}