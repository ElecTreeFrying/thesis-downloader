import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  docx: File = null;

  constructor() { }

  ngOnInit() {
  }
  
  fileChange(event: Event) {
    
    this.docx = event.target['files'][0];
    console.log(this.docx);
    
  }
  
  fileClear() {
    this.docx = null;
  }

}
