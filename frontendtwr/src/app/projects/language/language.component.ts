import { Component, OnInit } from '@angular/core';
import { Language } from '../project.model';
import { LanguageService } from '../language.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(
    private lservice: LanguageService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  languages: Language[];
  langinform: Language;
  myForm: FormGroup;
  markcountries: string[];
  markreligions: string[];

  async ngOnInit() {
    this.languages = await this.lservice.getalllang().toPromise() as Language[];

    this.myForm = this.fb.group({
      iso: ['', Validators.required],
      name: ['', Validators.required],
      langdescription: ['', Validators.required],
      population: ['', Validators.required],
      culture: ['', Validators.required],
      specificneed: ['', Validators.required],
      countries: this.fb.array([this.fb.control('')]),
      religions: this.fb.array([this.fb.control('')])
    });

  }

  get countries() {
    return this.myForm.get('countries') as FormArray;
  }
  get religions() {
    return this.myForm.get('religions') as FormArray;
  }

  async onedit(id: string) {
    this.langinform = await this.lservice.getonelang(id).toPromise() as Language;
    this.myForm.patchValue({
      iso: this.langinform.iso,
      name: this.langinform.name,
      langdescription: this.langinform.langdescription,
      population: this.langinform.population,
      culture: this.langinform.culture,
      specificneed: this.langinform.specificneed,
    })
    this.myForm.setControl('countries', this.setcountries(this.markcountries));
    this.myForm.setControl('religions', this.setreligions(this.markreligions));
    
  } 
  setcountries(countries: string[]): FormArray {
    const fa = new FormArray([]);
    console.log(countries);
    countries.forEach(k => fa.push(this.fb.control(k)));
    return fa;
  }
  
  setreligions(religions: string[]): FormArray {
    const fa = new FormArray([]);
    console.log(religions);
    religions.forEach(k => fa.push(this.fb.control(k)));
    return fa;
  }

  addcountries() {
    this.countries.push(this.fb.control(''));
  }
  
  addreligions() {
    this.religions.push(this.fb.control(''));
  }

  async submit() {
    if (this.langinform===undefined) {
      console.log(this.myForm.value);
      await this.lservice.addlang(this.myForm.value).toPromise();
    } else {
      await this.lservice.updatelang(this.langinform.id, this.myForm.value).toPromise();
    }
    this.langinform = undefined;
    this.ngOnInit();
  }

}
