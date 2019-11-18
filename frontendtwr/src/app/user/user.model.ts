import { Task } from '../projects/project.model';

export class User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    region: string[];
    country: string[];
    position: string[];
    tasks:Task[];
}