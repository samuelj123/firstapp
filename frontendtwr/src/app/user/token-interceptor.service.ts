import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private uservice: UserService) { }

  intercept(req, next) {
    const tokenizedrequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.uservice.getToken()}`
        // + this.uservice.getToken
      }
    })
    return next.handle(tokenizedrequest);
  }
}
