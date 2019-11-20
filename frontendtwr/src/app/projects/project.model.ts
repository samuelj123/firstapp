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
}

interface Need {
    need: string;
    pgroup: PGroup;
    project: Project[];
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
    programsno: number;
    productionformat: string;
    productionkpis: string[];
    distmethod: string[];
    distributionkpis: string[];
    marketingmethod: string[];
    marketingkpis: string[];
    description: string;
    fundraising: Fundraising[];
    audiencerelationskpis: string[];
    need: Need;
    approvallevel: number;
    country: string;
    kpis: KPI[];
    denialmsg: string;
    startdate: Date;

}

export interface Fundraising {
    method: string;
    amount: number;
}

export interface Language {
    id: string;
    name: string;
    iso: string;
    country: string[];
    langdescription: string;
    population: number;
    culture: string;
    religions: string[];
    specificneed: string;
}

export interface Task {
  realdeadline: number;
    projstartdate?: number;
    id?: string;
    task: string;
    duration: number; // The back-end name for Start-Date
    enddate: number;
    completed?: boolean;
    deadline?: Date;
    taskhandler: User;
    kpi?: KPI;
    project: Project;
}

export interface KPI {
    kpi: string;
    type: string;
    project?: Project;
    budget: number;
    id: string;
    tasks: Task[];
    report: string;
    pointperson: string;
}


// Project
// {
//     "name": "India",
//     "vision": "India",
//     "mission": "India",
//     "projectduration": 345,
//     "intendedoutcome": "India",
//     "programname": "India",
//     "duration": 345,
//     "contentformat": "India",
//     "productionformat": "India",
//     "productionkpis": ["India", "Pakistan", "Bangladesh", "Srilanka"],
//     "primarydistmethod": "India",
//     "secondarydistmethod": "India",
//     "tertiarydistmethod": "India",
//     "distributionkpis": ["India", "Pakistan", "Bangladesh", "Srilanka"],
//     "marketingmethod": ["India", "Pakistan", "Bangladesh", "Srilanka"],
//     "marketingkpis": ["India", "Pakistan", "Bangladesh", "Srilanka"],
//     "audiencerelationskpis": ["India", "Pakistan", "Bangladesh", "Srilanka"],
//     "need": "39804f82-c6df-4de0-bace-3196895bf927"
// }

// Pgroup{
//     "pgroup": "A small People Group",
//     "agegrouplow": 234,
//     "agegrouphigh": 234,
//     "country": "India",
//     "population": 234,
//     "electricityaccess": 234,
//     "literacyrate": 234,
//     "averageincome": 234,
//     "needs": [
//         { "need": "A small need" },
//         { "need": "A second small need "},
//         { "need": "A third small need" },
//     ]
// }
