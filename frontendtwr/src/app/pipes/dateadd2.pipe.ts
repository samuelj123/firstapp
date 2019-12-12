import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateadd2',
  pure: true
})
export class Dateadd2 implements PipeTransform {
  transform(date:string, number: number): Date {
    if(date!==undefined) {
      let newdate = date.split('-',3);
      const ndate = new Date(+newdate[0], +newdate[1]-1, +newdate[2]);
      ndate.setDate(ndate.getDate() + number);
      return ndate;
    }
  }
}
