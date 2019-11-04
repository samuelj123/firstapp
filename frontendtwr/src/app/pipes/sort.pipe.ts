import { Pipe, PipeTransform } from '@angular/core';

import { KPI } from '../projects/project.model';
@Pipe({
  name: 'sort',
  pure: true
})
export class sortPipe implements PipeTransform {
  transform(kpis: KPI[], type: string): KPI[] {
    const approvedprojects = kpis.filter(value => value.type === type )
    return approvedprojects;
  }
}
