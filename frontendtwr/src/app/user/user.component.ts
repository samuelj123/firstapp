import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allusers: any;
  showVar = false;

  constructor(private uservice: UserService) { }

  ngOnInit() {
    this.uservice.getall().subscribe((data) => { this.allusers = data; });

  }
  delete(value: string) {
    return this.uservice.delete(value).subscribe();
  }


  // Tackling the "Add New User" bit...
  toggleChild() {
    this.showVar = !this.showVar;
  }
}
