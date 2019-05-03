import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../common/core/services/auth.service';
import { FirestoreService } from '../../common/core/services/firestore.service';
import { SharedService } from '../../common/core/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isEntered: boolean = false;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private firestore: FirestoreService,
    private shared: SharedService
  ) {
    this.loginForm = fb.group({
      // 'email': [ 'a@a.com', [ Validators.email,Validators.required ] ],
      // 'password': [ '123123', [ Validators.required, Validators.minLength(6) ] ],
      'email': [ '', [ Validators.email,Validators.required ] ],
      'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
      'option': [ 'student', [ Validators.required ] ],
    })
  }

  ngOnInit() {
  }
  
  get emailErr() { return this.loginForm.get('email').errors };
  get passwordErr() { return this.loginForm.get('password').errors };
  get optionErr() { return this.loginForm.get('option').errors };
  
  register() {
    
    this.router.navigate(['registration'])
  }
  
  login() {
    
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const option = this.loginForm.value.option;
    
    this.isEntered = true;
    
    this.firestore.checkIf({ email, password, option }).subscribe((res) => {
    
      if (res.length > 0) {
        this.auth.login({ email, password }).then(() => {
          
          sessionStorage.setItem('option', option);
          this.router.navigate([option])
            .then(() => (this.firestore.enableNetwork()));
          this.shared.openSnack({
            class: [ 'snack' ],
            duration: 5000,
            horizontal: 'center',
            vertical: 'bottom',
            message: 'Logged in successfully.'
          });
        });
      } else {
        this.shared.openSnack({
          class: [ 'snack' ],
          duration: 5000,
          horizontal: 'center',
          vertical: 'bottom',
          message: 'Please try again.'
        });
        this.isEntered = false;
      }
    
    });
    
    
  }

}
