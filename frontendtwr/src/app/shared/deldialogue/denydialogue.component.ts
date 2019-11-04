import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export type DialogueData = { id: string, string: string, associated: string }

@Component({
  selector: 'app-denydialogue',
  templateUrl: './denydialogue.component.html',
  styleUrls: ['./deldialogue.component.sass']
})
export class DenydialogueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DenydialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogueData) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(data) {
    
  }
}
