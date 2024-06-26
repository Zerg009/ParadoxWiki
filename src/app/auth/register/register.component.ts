import { Component } from '@angular/core';
import { RegisterForm } from '../../types/Auth';
import { AuthService } from '../../services/auth.service';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator, strongPasswordValidator } from '../validators/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: RegisterForm = {
    email: '',
    password: '',
    firstName: ''
  }
  registerForm: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder,private router: Router) { }
  submit() {
    // if (this.form.password != this.form.confirmPassword) {
    //   this.authService.showError("Passwords dont match!", "Different Passwords");
    //   return;
    // }

    // Map values from registerForm to form
    this.form.email = this.registerForm.get('email')?.value;
    this.form.firstName = this.registerForm.get('firstName')?.value;
    this.form.password = this.registerForm.get('password')?.value;
    this.authService.register(this.form).subscribe({
      next: goodResponse => {
        console.log('Authenticate response:', goodResponse);
        this.router.navigate(['/login']);
        // this.authService.isShowingRegister = false;
      },
      error: errorResponse => {
        console.log('Authenticate response:', errorResponse);

        this.authService.showError(errorResponse.error.message, "Register Error");
      }
    });;

  }
  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {
      validators: passwordMatchValidator
    };
    // if(this.registerForm){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      password: ['', [Validators.required, strongPasswordValidator()]],
      confirmPassword: ['', Validators.required],
    },
      formOptions
    );
    //  }
  }

  isLoading() {
    return this.authService.isLoading;
  }
}
