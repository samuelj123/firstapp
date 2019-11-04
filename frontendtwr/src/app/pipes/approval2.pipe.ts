import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../projects/project.model';
@Pipe({
  name: 'approval2',
  pure: true
})
export class Approval2Pipe implements PipeTransform {
  transform(Projects: Project[]): Project[] {
    const approvedprojects = Projects.filter(value => value.approvallevel === 2)
    return approvedprojects;
  }
}
