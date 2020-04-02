import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../projects/project.model';
@Pipe({
  name: 'inyears',
  pure: true
})
export class inYears implements PipeTransform {
  transform(duration: number): string {
		if(duration>365){
			const years = duration/365;
			const afteryears = duration % 365;
			if(afteryears>30) {
				const months = afteryears/30;
				const days = afteryears % 30;
				if (days>0){
					return years + "years, " + months + " months and " + days +" days"
				} else {
					return years + "years and" + months + " months"
				}
			} else {
				const days = afteryears;
				if(days>0){
					return years + "years, and" + days + " days"
				} else {return years + "years"}
			}
		} else {
			if(duration>30) {
				const months = duration/30;
				const days = duration % 30;
				return months + " months and " + days +" days"
			} else {
				return duration + "days"
			}
		}
  }
}
