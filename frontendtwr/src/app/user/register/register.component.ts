import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private uservice: UserService) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      country: [''],
      region: new FormArray([]),
      position: new FormArray([]),
    });
    this.addPositionCheckboxes();
  }
  userForm: FormGroup;
  position = [
    { id: 1, name: 'Donor' },
    { id: 2, name: 'ID' },
    { id: 3, name: 'CEO' },
    { id: 4, name: 'RO' },
    { id: 5, name: 'COORDINATOR' },
    { id: 6, name: 'MANAGER' },
    { id: 7, name: 'EXECUTIVE' },
    { id: 8, name: 'ADMIN' }
  ];

  countri = [ 'India', 'Pakistan', 'Bangladesh', 'Srilanka', 'Nepal' ];

  @Input() showMePartially: boolean;

  private addPositionCheckboxes() {
    this.position.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.userForm.controls.position as FormArray).push(control);
    });
  }

 getPositions() {
    return [
      { id: 1, name: 'Donor' },
      { id: 2, name: 'ID' },
      { id: 3, name: 'CEO' },
      { id: 4, name: 'RO' },
      { id: 5, name: 'COORDINATOR' },
      { id: 6, name: 'MANAGER' },
      { id: 7, name: 'EXECUTIVE' },
    ];
  }

  register() {
    // Refactor Country Check-list to FormValue (Without this code, it'll show 'true''false' kinda weird array. )

    // Refactor Position Check-List to FormValue (Without this code, it'll show 'true''false' kinda weird array. )
    const selectedPositions = this.userForm.value.position
      .map((v, i) => v ? this.position[i].name : null)
      .filter(v => v !== null);

    this.userForm.patchValue({ position: selectedPositions });
    this.showMePartially = false;
    return this.uservice.add(this.userForm.value).subscribe();
  }

  ngOnInit() {
  }

}
