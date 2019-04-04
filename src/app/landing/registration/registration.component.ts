import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
  ) {
    this.registrationForm = fb.group({
      'name': [ '' ],
      'email': [ '' ],
      'password': [ '' ],
      'confirm': [ '' ],
      'number': [ '' ],
      'role': [ '' ],
    })
  }

  ngOnInit() {
  }
  
  register() {
    
    console.log(this.registrationForm.value);
    
  }

}
