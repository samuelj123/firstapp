import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loginDTO } from './login/login.dto';
import { jwtPayload } from './login/jwt-payload.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // api = 'https://mighty-waters-64457.herokuapp.com/api/user';
  // api = 'http://localhost:4000/api/user';
  api = environment.API_USERSERVICE;

  getall() {
    return this.http.get(this.api);
  }

  getallbyfilter(id) {
    return this.http.get(this.api + '?p=' + id);
  }

  delete(id: string) {
    return this.http.delete(this.api + '/' + id);
  }

  getone(id: string) {
    return this.http.get(this.api + '/' + id);
  }

  add(value: User) {
    return this.http.post(this.api, value);
  }

  put(id: string, value: User) {
    return this.http.put(this.api + '/' + id, value);
  }

  login(value: loginDTO) {
    return this.http.post(this.api + '/login', value);
  }


  loggedIn() {
    return !!localStorage.getItem('currentuser');
  }

  currentuser() {
    const userid: string = localStorage.getItem('userid')
    return this.getone(userid);
  }

  getToken() {
    return localStorage.getItem('currentuser');
  }

  logout() {
    localStorage.removeItem('currentuser');
  }

  async currentusercountry() {
    const value: User = await this.currentuser().toPromise() as User;
    const x = value.country.toString();
    return x;
  }

  async currentuserrole() {
    const value: User = await this.currentuser().toPromise() as User;
    const x = value.position.toString();
    return x;
  }


}

