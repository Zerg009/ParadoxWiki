import { Component } from '@angular/core';
import { LoginForm } from '../../types/Auth';
import { AuthService } from '../../services/auth.service';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strongPasswordValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: LoginForm = {
    email: '',
    password: ''
  };
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      rememberMe: [false]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.form.email = this.loginForm.value.email;
      this.form.password = this.loginForm.value.password;
      this.authService.rememberMe = this.loginForm.value.rememberMe;
      this.authService.login(this.form);

      console.log(this.loginForm.value);
      // handle form submission
    }
  }

  isLoading() {
    return this.authService.isLoading;
  }

  closeForm() {
    this.authService.isShowingLogin = false;
  }
}
