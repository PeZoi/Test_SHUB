export class InformationStation {
   chuoi: string;
   tu_ngay: string;
   tong_tien: string;
   tram: string;
   den_ngay: string;
   tong_lit: string;
   constructor(
      chuoi: string,
      tu_ngay: string,
      tong_tien: string,
      tram: string,
      den_ngay: string,
      tong_lit: string
   ) {
      this.chuoi = chuoi;
      this.tu_ngay = tu_ngay;
      this.tong_tien = tong_tien;
      this.tram = tram;
      this.den_ngay = den_ngay;
      this.tong_lit = tong_lit;
   }
}