import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import * as _ from 'lodash';

import { AuthService } from './auth.service';

import { IRegister } from '../../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  userCollection: AngularFirestoreCollection<any>;
  fileCollection: AngularFirestoreCollection<any>;

  constructor(
    private router: Router,
    private auth: AuthService,
    private firestore: AngularFirestore,
  ) {
    this.userCollection = firestore.collection('user-details');
    this.fileCollection = firestore.collection('files');
  }
  
  enableNetwork() {
    return this.firestore.firestore.enableNetwork();
  }
  
  disableNetwork() {
    return this.firestore.firestore.disableNetwork();
  }
  
  checkIf(option: { email: string, password: string, option: string }) {
    
    return this.userCollection.valueChanges().pipe(
      map((db) => {
        return db.filter((fire) => fire.email.trim() == option.email.trim() &&
          fire.password.trim() == option.password.trim() &&
          fire.role.trim() == option.option.trim())
      })
    )
  }
  
  createUser(user: IRegister) {
    this.enableNetwork();
    return this.auth.register(user)
      .then((fire) => {
        
        this.userCollection.add({ ...user, uid: fire.user.uid }).then(() => {
          this.router.navigate([user.role])
        });
        
      }).catch(() => {
        
        this.disableNetwork();
      })
  }
  
  setFileStatus(key: string, status: string) {
    
    let counter = 0;
    switch (status) {
      
      case 'download': break;
      case 'remove': {
        
        this.fileCollection.snapshotChanges().pipe(
          map((db) => {
            if (counter > 0) return;
            db.map((fire) => {
              if (fire.payload.doc.id === key) {
                fire.payload.doc.ref.delete();
                counter++;
              }
              
            })
          })
        ).subscribe(() => 0);
        break;
      }
      
      default: {

        this.fileCollection.snapshotChanges().pipe(
          map((db) => {
            if (counter > 0) return;
            db.map((fire) => {
              if (fire.payload.doc.id === key) {
                fire.payload.doc.ref.update({ status })
                counter++;
              }

            })
          })
        ).subscribe(() => 0);
      }
      
    }
    
  }
  
  readFiles(option: string) {
    
    const all = this.fileCollection.snapshotChanges().pipe(
      map((db) => db.map((fire) => ({ ...fire.payload.doc.data(), postId: fire.payload.doc.id })))
    );
    
    const select = this.fileCollection.snapshotChanges().pipe(
      map((db) => {
        return db
          .map((fire) => ({ ...fire.payload.doc.data(), postId: fire.payload.doc.id }))
          .filter((fire) => fire['status'] === option);
      })
    );
    
    const old = this.fileCollection.snapshotChanges().pipe(
      map((db) => db.map((fire) => ({ ...fire.payload.doc.data(), postId: fire.payload.doc.id }))),
      map((db) => <any[]>_.sortBy(db, [(db) => db.timestamp]))
    );
    
    const neww = this.fileCollection.snapshotChanges().pipe(
      map((db) => db.map((fire) => ({ ...fire.payload.doc.data(), postId: fire.payload.doc.id }))),
      map((db) => <any[]>_.sortBy(db, [(db) => db.timestamp]).reverse())
    );
    
    return option === 'all' ? all
      : option === 'old' ? old
      : option === 'new' ? neww
      : select;
  }
  
}
