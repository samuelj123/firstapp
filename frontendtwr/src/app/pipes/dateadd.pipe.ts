import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateadd',
  pure: true
})
export class Dateadd implements PipeTransform {
  transform(date:Date, number: number): Date {
    if(date!==undefined){date.setDate(date.getDate() + number);}
    return date;
  }
}
