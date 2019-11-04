import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private http: HttpClient) { }
   // project = 'https://mighty-waters-64457.herokuapp.com/api/language';
   language = 'http://localhost:4000/api/language';

  getalllang() {
    return this.http.get(this.language);
  }

  deletelang(id: string) {
    return this.http.delete(this.language + '/' + id);
  }

  getonelang(id: string) {
    return this.http.get(this.language + '/' + id);
  }

  addlang(value: Language) {
    return this.http.post(this.language, value);
  }
  
  findbyiso(iso: string) {
    return this.http.get(this.language + '?iso=' + iso);
  }

  updatelang(id: string, value: Language) {
    return this.http.put(this.language + '/' + id, value);
  }

}
