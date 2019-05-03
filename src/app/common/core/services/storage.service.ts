import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';

import { FirestoreService } from './firestore.service';

import { IDocx } from '../../shared/interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadState: AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage,
    private firestore: FirestoreService
  ) { }
  
  fileUpload(item: IDocx) {
    
    this.uploadState = this.storage.ref(item.folder + '/' + item.file.name).put(item.file);
    delete item['file']
    
    this.uploadState.then((snapshot) => {
    
      snapshot.ref.getDownloadURL().then((url) => {

        this.firestore.fileCollection.add({ url, ...item });
      })
    })
      
  }
  
  deleteFile(item: IDocx) {
    this.storage.ref(item.folder + '/' + item._file.name).delete();
  }
  
}
