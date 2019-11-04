import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../projects/project.model';
@Pipe({
  name: 'approval0',
  pure: true
})
export class Approval0Pipe implements PipeTransform {
  transform(Projects: Project[]): Project[] {
    const approvedprojects = Projects.filter(value => value.approvallevel === 0)
    return approvedprojects;
  }
}
