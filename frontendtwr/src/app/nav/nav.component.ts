import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  cuser;
  constructor(private router: Router, private uservice: UserService) { }
  ngOnInit() {
    this.uservice.currentuser().subscribe(x => { this.cuser = x; });
  }

  logout() {
    this.uservice.logout();
    this.router.navigateByUrl('/login');
  }

  pplgrp() {
    this.router.navigateByUrl('/pgroup');
  }
  prj() {
    this.router.navigateByUrl('projects');
  }
  users() {
    this.router.navigateByUrl('users');
  }
  dashboard() {
    const id = this.cuser.id;
    this.router.navigateByUrl('/dashboard/' + id)
  }
}
