import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = fb.group({
      'email': [ '' ],
      'password': [ '' ],
      'option': [ '' ],
    })
  }

  ngOnInit() {
  }
  
  register() {
    
    this.router.navigate(['registration'])
    
  }
  
  login() {
    
    const option = this.loginForm.value.option || 'student';
    
    console.log(this.loginForm.value);
    this.router.navigate([option])
    
  }

}
