import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../projects/project.model';
@Pipe({
  name: 'firstletter',
  pure: true
})
export class FirstLetter implements PipeTransform {
  transform(firstname: string): string {
    const firstletter = firstname.charAt(0).toUpperCase();
    return firstletter;
  }
}
