import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { PGroup } from '../project.model';
import { DeldialogueComponent } from '../../shared/deldialogue/deldialogue.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-pgs',
  templateUrl: './pgs.component.html',
  styleUrls: ['./pgs.component.css']
})
export class PGsComponent implements OnInit {

  constructor(private projservice: ProjectsService, private uservice: UserService, private router: Router) { }
  showVar: boolean;
  allpgs: PGroup[];
  userrole: string;
  async ngOnInit() {
    const country = await this.uservice.currentusercountry() as string;
    if(country === 'Singapore') {
    this.allpgs = await this.projservice.getallpg().toPromise() as PGroup[];
    } else {
      this.allpgs = await this.projservice.getfilteredpg(country).toPromise() as PGroup[];
    }
    this.userrole = await this.uservice.currentuserrole();
    this.allpgs.map(x => x.projectnos = x.needs.map(y => y.project.length).reduce((a, b) => a + b, 0))
  }

  // // Tackling the "Add New People Group bit...
  // toggleChild() {
  //   this.showVar = !this.showVar;
  // }

  addpg() {
    this.router.navigateByUrl('/addpg');
  }

  async delete(value: string) {
    // const pgroup = await this.projservice.getonepg(value).toPromise() as PGroup;
    // // console.log(pgroup.pgroup);
    // const dialogRef = this.dialog.open(DeldialogueComponent, {
    //   width: '250px',
    //   data: { id: pgroup.id, string: pgroup.pgroup, associated: 'the Needs and the Projects' }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === undefined) { } else {
    //     this.projservice.deletepg(value).subscribe();
    //     this.ngOnInit();
    //   }
    // });
  }

  edit(value: string) {
    this.router.navigateByUrl('/addpg/' + value);
  }
}
