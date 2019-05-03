import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';

import { AuthService } from './common/core/services/auth.service';
import { FirestoreService } from './common/core/services/firestore.service';
import { StorageService } from './common/core/services/storage.service';
import { EntryGuard, ExitGuard, ComponentGuard } from './common/core/services/route-guard.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
  ],
  exports: [
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserModule,
  ],
  providers: [
    AuthService,
    FirestoreService,
    StorageService,
    EntryGuard,
    ExitGuard,
    ComponentGuard,
  ]
})
export class AppProviderModule { }
