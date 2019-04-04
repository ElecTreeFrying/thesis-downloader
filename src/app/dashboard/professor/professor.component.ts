import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

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
