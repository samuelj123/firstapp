import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { PGroup } from '../project.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user.model';


@Component({
  selector: 'app-pgs',
  templateUrl: './pgs.component.html',
  styleUrls: ['./pgs.component.css']
})
export class PGsComponent implements OnInit {

  constructor(private projservice: ProjectsService, private uservice: UserService, private router: Router) { }
  showVar: boolean;
  cuser: User;
  allpgs: PGroup[];
  userrole: string;
  deletediag: string[] = [];
  async ngOnInit() {
    this.cuser = await this.uservice.currentuser().toPromise() as User;
    const country = await this.uservice.currentusercountry() as string;
    if(country === 'Singapore') {
    this.allpgs = await this.projservice.getallpg().toPromise() as PGroup[];
    } else {
      this.allpgs = await this.projservice.getfilteredpg(country).toPromise() as PGroup[];
    }
    this.userrole = await this.uservice.currentuserrole();
  }

  addpg() {
    this.router.navigateByUrl('/addpg');
  }

  async deletediager(x:string) {
    console.log(this.deletediag);
    this.deletediag.push(x);
    console.log(this.deletediag);
  }
  async deleter(x:string) {
    this.projservice.deletepg(x).toPromise();
    this.deletediag=[];
    this.ngOnInit();
  }

  close() {
    this.deletediag=[];
  }

  edit(value: string) {
    this.router.navigateByUrl('/addpg/' + value);
  }
}
