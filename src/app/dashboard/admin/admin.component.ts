import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators'

import { AuthService } from '../../common/core/services/auth.service';
import { FirestoreService } from '../../common/core/services/firestore.service';
import { StorageService } from '../../common/core/services/storage.service';
import { SharedService } from '../../common/core/services/shared.service';

import { UploadDialogComponent } from '../../common/shared/components/upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  filterForm: FormGroup;
  uploadDialogRef: MatDialogRef<UploadDialogComponent>;
  // documents: Observable<any>;
  documents: any[];
  _documents: any[];
  filterObservable: Observable<any>;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private router: Router,
    private uploadDialog: MatDialog,
    private auth: AuthService,
    private firestore: FirestoreService,
    private storage: StorageService,
    private shared: SharedService
  ) {
    this.filterForm = fb.group({
      'filter': [ '' ],
    })
  }

  ngOnInit() {
    
    // this.documents = this.firestore.readFiles('all');
    this.firestore.readFiles('all').subscribe((res: any) => {
      this.documents = res;
      this._documents = res;
    });

    const value = this.filterForm.get('filter').value;
    this.filterObservable = this.filterForm.get('filter').valueChanges
      .pipe(
        startWith(value),
        map(a => this.displayFn(a)),
        map(b => this.filterResearch(b))
      )

    this.filterObservable.subscribe((res) => {
      this.documents = res;
    });
    
  }
  
  backspace() {
    this.documents = this._documents
  }
  
  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.title : value;
  }
  
  filterResearch(value: string) {
    return value ? this._filter(this.documents, value) : this.documents;
  }
  
  private _filter(doc: any[], value: string) {
    const filterValue = value.toLowerCase();
    return doc.filter(d => d.title.toLowerCase().includes(filterValue));
  }
  
  uploadClick() {
    this.uploadDialogRef = this.uploadDialog.open(UploadDialogComponent, { data: '' });
  }
  
  onSort(option: string) {
    
    if (option === 'all') {
      // this.documents = this.firestore.readFiles('all');
      this.firestore.readFiles('all').subscribe((res: any) => {
        this.documents = res;
        this._documents = res;
      });
    } else if (option === 'new') {
      // this.documents = this.firestore.readFiles('new');
      this.firestore.readFiles('new').subscribe((res: any) => {
        this.documents = res;
        this._documents = res;
      });
    } else if (option === 'old') {
      // this.documents = this.firestore.readFiles('old');
      this.firestore.readFiles('old').subscribe((res: any) => {
        this.documents = res;
        this._documents = res;
      });
    } else if (option === 'acc') {
      // this.documents = this.firestore.readFiles('accepted');
      this.firestore.readFiles('accepted').subscribe((res: any) => {
        this.documents = res;
        this._documents = res;
      });
    } else if (option === 'rej') {
      // this.documents = this.firestore.readFiles('rejected');
      this.firestore.readFiles('rejected').subscribe((res: any) => {
        this.documents = res;
        this._documents = res;
      });
    } else if (option === 'pen') {
      // this.documents = this.firestore.readFiles('pending');
      this.firestore.readFiles('pending').subscribe((res: any) => {
        this.documents = res;
        this._documents = res;
      });
    }
  }
  
  onDownload(url: string) {
    window.open(url, '_blank');
  }
  
  setStatus(key: string, status: string, document: any) {
    this.firestore.setFileStatus(key, status);
    this.storage.deleteFile(document);
    this.shared.openSnack({
      class: [ 'snack' ],
      duration: 5000,
      horizontal: 'center',
      vertical: 'bottom',
      message: `Research ${status}.`
    })
  }
  
  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/'])
        .then(() => (this.firestore.disableNetwork()))
      this.shared.openSnack({
        class: [ 'snack' ],
        duration: 5000,
        horizontal: 'center',
        vertical: 'bottom',
        message: `Logged out successfully.`
      })
    })
  }
  
}
