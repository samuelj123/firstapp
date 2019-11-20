import { Injectable } from '@angular/core';
import { PGroup, Task } from './project.model';
import { HttpClient } from '@angular/common/http';
import { Project } from './project.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  // project = 'https://mighty-waters-64457.herokuapp.com/api/project';
  // project = 'http://localhost:4000/api/project';
  project = environment.API_PROJECTSERVICE

  // Task CRUD
  // task = 'https://mighty-waters-64457.herokuapp.com/api/task';
  // task = 'http://localhost:4000/api/task';
  task = environment.API_TASKSERVICE

  // People Group CRUD
  // pgroup = 'https://mighty-waters-64457.herokuapp.com/api/pgroup';
  // pgroup = 'http://localhost:4000/api/pgroup';
  pgroup = environment.API_PGROUPSERVICE

  // KPI Group CRUD
  // kpi = 'https://mighty-waters-64457.herokuapp.com/api/kpi';
  // kpi = 'http://localhost:4000/api/kpi';
  kpi = environment.API_KPISERVICE

  // Fundraising Group CRUD
  // fundraising = 'https://mighty-waters-64457.herokuapp.com/api/fundraising';
  // fundraising = 'http://localhost:4000/api/fundraising';
  fundraising = environment.API_FUNDRAISINGSERVICE


  getallpg() {
    return this.http.get(this.pgroup);
  }

  deletepg(id: string) {
    return this.http.delete(this.pgroup + '/' + id);
  }

  getfilteredpg(country: string) {
    return this.http.get(this.pgroup + '?name=' + country);
  }

  getonepg(id: string) {
    return this.http.get(this.pgroup + '/' + id);
  }

  addpg(value: PGroup) {
    return this.http.post(this.pgroup, value);
  }

  // Projects CRUD
  getallproj() {
    return this.http.get(this.project);
  }

  getfilteredproj(country: string) {
    return this.http.get(this.project + '/country?name=' + country);
  }

  deleteproj(id: string) {
    return this.http.delete(this.project + '/' + id);
  }

  getoneproj(id: string) {
    return this.http.get(this.project + '/' + id);
  }

  addproj(value: Project) {
    return this.http.post(this.project, value);
  }

  updateproj(value: Partial<Project>, id: string) {
    return this.http.put(this.project + '/' + id, value);
  }

  createemptyproj() {
    return this.http.post(this.project, {});
  }

  // Tasks CRUD

  getalltasks() {
    return this.http.get(this.task);
  }

  gettasksinkpi(id: string) {
    return this.http.get(this.task + '/' + id);
  }

  gettasksinproj(id: string) {
    return this.http.get(this.task + '?p=' + id)
  }

  newtask(kpiid: string, value: any) {
    return this.http.post(this.task + '/' + kpiid, value);
  }

  updatetask(id, value) {
    return this.http.put(this.task + '/' + id, value);
  }
  updatetaskincharge(userid, taskid) {
    return this.http.put(this.task+"?inchargeid=" + userid + "&taskid=" + taskid, '');
  }

  deletetask(id) {
    return this.http.delete(this.task + '/' + id);
  }


  // KPI CRUD
  getkpibyproj(projid: string) {
    return this.http.get(this.kpi + '?p=' + projid);
  }

  getkpibyprojwithtasks(projid: string) {
    return this.http.get(this.kpi, {
      params: {p: projid, t: 'true'}
    })
  }

  getkpibyid(kpiid: string) {
        return this.http.get(this.kpi + '/' + kpiid);
      }

  newkpi(value) {
        return this.http.post(this.kpi, value);
      }

  updatekpi(id, value) {
        return this.http.put(this.kpi + '/' + id, value);
      }

  deletekpi(id) {
        return this.http.delete(this.kpi + '/' + id);
      }

    // FUNDRAISING CRUD
    getfraisingbyproj(projid: string) {
      return this.http.get(this.fundraising + '?p=' + projid);
    }

    getfraisingbyid(kpiid: string) {
          return this.http.get(this.fundraising + '/' + kpiid);
        }

    newfundraising(value) {
          return this.http.post(this.fundraising, value);
        }

    updatefundraising(id, value) {
          return this.http.put(this.fundraising + '/' + id, value);
        }

    deletefundraising(id) {
          return this.http.delete(this.fundraising + '/' + id);
        }
}
