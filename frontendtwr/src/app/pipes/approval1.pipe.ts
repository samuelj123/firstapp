import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../projects/project.model';
@Pipe({
  name: 'approval1',
  pure: true
})
export class Approval1Pipe implements PipeTransform {
  transform(Projects: Project[]): Project[] {
    const approvedprojects = Projects.filter(value => value.approvallevel === 1)
    return approvedprojects;
  }
}
