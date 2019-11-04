import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { jwtPayload } from './jwt-payload.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private uservice: UserService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.uservice.login(this.loginForm.value)
      .subscribe((x: jwtPayload) => {
        if (x && x.token) {
          localStorage.setItem('currentuser', x.token);
          localStorage.setItem('userid', x.id);
          localStorage.setItem('usercountry', x.country);
        }
        return;
      }, error => {this.error = error.error.text});
    this.router.navigateByUrl('/projects');
  }
}
