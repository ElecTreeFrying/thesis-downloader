import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { SharedService } from '../../../core/services/shared.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  uploadForm: FormGroup;
  docx: File = null;
  tags = [];
  separatorKeysCodes = [ ENTER, COMMA, 186 ];

  @ViewChild('file') file: ElementRef;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private storage: StorageService,
    private shared: SharedService
  ) {
    this.uploadForm = fb.group({
      'researchTitle': [ '', [ Validators.required, Validators.minLength(3) ] ],
      'researchTopic': [ '', [ ] ],
    })
  }
  
  get researchTitleErr() { return this.uploadForm.get('researchTitle').errors; }
  get researchTopicErr() { return this.uploadForm.get('researchTopic').errors; }

  ngOnInit() {
  }
  
  fileChange(event: Event) {
    
    this.docx = event.target['files'][0];
    
    const type = this.docx.name.split('.').reverse()[0];
    const cond = type.match(/^(doc|dot|wbk|docx|docm|dotx|dotm|docb)$/) !== null;

    if (!cond) this.fileClear();
    
  }
  
  fileClear() {
    this.docx = null;
    this.file.nativeElement.value = ''
  }
  
  onUpload() {
    
    const cond = this.uploadForm.valid && Boolean(this.docx);
    if (!cond) return;
    
    const title = this.uploadForm.get('researchTitle').value;
    const timestamp = this.shared.timestamp;
    const folder = 'research-documents';
    const item = {
      title,
      file: this.docx,
      _file: {
        name: this.docx.name,
        size: this.docx.size,
        type: this.docx.type,
        lastModified: this.docx.lastModified,
      },
      tags: this.tags,
      status: 'pending',
      timestamp,
      folder
    };
    
    this.storage.fileUpload(item)
    this.dialog.closeAll();
    
  }
  
  
  add(event: MatChipInputEvent): void {
    const { input, value } = event;

    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }
  
  remove(topic: any[]): void {
    const index = this.tags.indexOf(topic);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
