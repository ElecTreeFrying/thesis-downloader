import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, debounceTime } from 'rxjs/operators';

import { FirestoreService } from '../../common/core/services/firestore.service';
import { SharedService } from '../../common/core/services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  current: string;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private afs: AngularFirestore,
    private firestore: FirestoreService,
    private shared: SharedService
  ) {
    this.registrationForm = fb.group({
      'name': [ '', [ Validators.required, Validators.minLength(2) ] ],
      'email': [ '', [ Validators.required, Validators.email ] ],
      'password': [ '', [ Validators.required, Validators.minLength(6) ] ],
      'confirm': [ '', [ Validators.required, this.confirmCheck.bind(this) ] ],
      'number': [ '', [ Validators.required, Validators.minLength(7) ], CustomValidator.idNumber(this.afs) ],
      'role': [ 'student', [ Validators.required ] ],
      // 'name': [ 'Uchiha Madara', [ Validators.required, Validators.minLength(2) ] ],
      // 'email': [ 'a@a.com', [ Validators.required, Validators.email ] ],
      // 'password': [ '123123', [ Validators.required, Validators.minLength(6) ] ],
      // 'confirm': [ '123123', [ Validators.required, this.confirmCheck.bind(this) ] ],
      // 'number': [ '09777371486', [ Validators.required, Validators.minLength(7) ] ],
      // 'role': [ 'student', [ Validators.required ] ],
    })
  }
  
  get nameErr() { return this.registrationForm.get('name').errors; }
  get emailErr() { return this.registrationForm.get('email').errors; }
  get passwordErr() { return this.registrationForm.get('password').errors; }
  get confirmErr() { return this.registrationForm.get('confirm').errors; }
  get numberErr() { return this.registrationForm.get('number').errors; }
  get roleErr() { return this.registrationForm.get('role').errors; }

  ngOnInit() {
    
    this.registrationForm.valueChanges.subscribe((res) => {
      this.current = res['password'];
      
      // console.log(this.registrationForm.get('number').status);
      console.log(this.registrationForm.status);
      
    });
    
    this.registrationForm.get('number').status
  }
  
  register() {
    
    this.registrationForm.invalid
      ? this.shared.openSnack({
        class: [ 'snack' ],
        duration: 5000,
        horizontal: 'center',
        vertical: 'bottom',
        message: `Please try again.`
      }) : this.shared.openSnack({
        class: [ 'snack' ],
        duration: 5000,
        horizontal: 'center',
        vertical: 'bottom',
        message: `Successfully created an account.`
      });
    
    const user = this.registrationForm.value;
    delete user['confirm'];
    
    this.registrationForm.patchValue({ confirm: this.current })
    this.firestore.createUser(user);
  }
  
  get number() {
    return this.registrationForm.get('number');
  }
  
  private confirmCheck(control: AbstractControl): ValidationErrors | null {
    const condition = control.value === this.current;
    return condition ? null : { isNotMatched: true };
  }

}

export class CustomValidator {
  
  static idNumber(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const number = control.value.toLowerCase();
      return afs.collection('user-details', ref => ref.where('number', '==', number))
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ? { idDuplicate: true } : null)
        );
    }
  }
}
