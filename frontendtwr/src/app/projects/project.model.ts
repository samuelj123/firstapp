import { User } from '../user/user.model';

export interface PGroup {
    id: string;
    pgroup: string;
    agegrouplow: number;
    agegrouphigh: number;
    country: string;
    description: string;
    population: number;
    electricityaccess: number;
    literacyrate: number;
    averageincome: number;
    location: string;
    needs: Need[];
    projectnos: number;
    mediaaccess: string;
		language: Language;
		project: Project[];
}
export interface Language {
		id: string;
		name: string;
		iso: string;
		langdescription: string;
		population: number;
		culture: string;
		religions: string[];
		specificneed: string;
		country: string;
		pgroups?: PGroup[];
		user?: User[];
}
interface Need {
    need: string;
    pgroup: PGroup;
}
export interface Project {
    id: string;
    name: string;
    vision: string;
    mission: string;
    projectduration: number;
    intendedoutcome: string;
    programname: string;
    duration: number;
    contentformat: string;
		contentdescription: string;
		contentschedule: string;
    programsno: number;
    productionformat: string;
    productionkpis: string[];
    distmethod: string[];
    distributionkpis: string[];
    marketingmethod: string[];
    marketingkpis: string[];
    description: string;
    fraising: Fundraising[];
    audiencerelationskpis: string[];
    pgroup: PGroup;
    approvallevel: number;
    country: string;
		budget: Budget[];
    kpis: KPI[];
    denialmsg: string;
    startdate: Date;

}

export interface Fundraising {
		id?: string;
    method: string;
    amount: number;
		pointperson: User;
}

export interface Task {
  realdeadline: number;
    projstartdate?: number;
    id?: string;
    task: string;
    startdate: number; // The back-end name for Start-Date
    enddate: number;
    complete?: boolean;
    deadline?: Date;
    taskhandler: User;
    project: Project;
		category: string;
}

export interface KPI {
    kpi: string;
		updated: Date;
		created: Date;
    type: string;
    project?: Project;
    id: string;
    tasks: Task[];
    report: string;
    pointperson: string;
}

export interface Budget {
	id?: string;
	amount: number;
	category: string;
	project?: string;
	
}
