import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';

import { ILogin, IRegister } from '../../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state: Observable<any>;

  constructor(private fire: AngularFireAuth) {
    this.state = fire.authState;

    fire.authState.subscribe((res) => {
      console.log(res);
    });
  }
  
  login(user: ILogin) {
    return this.fire.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  
  register(user: IRegister) {
    return this.fire.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  
  logout() {
    return this.fire.auth.signOut();
  }
  
}
