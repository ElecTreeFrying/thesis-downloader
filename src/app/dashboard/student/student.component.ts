import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

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
