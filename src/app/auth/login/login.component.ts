import { Component } from '@angular/core';
import { LoginForm } from '../../types/Auth';
import { AuthService } from '../../services/auth.service';
import { AngularDialogComponent } from '../angular-dialog/angular-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  
  
  constructor(private authService : AuthService){}
  submit() {
    this.authService.login(this.form).subscribe({
      next: response => {
        this.authService.isAuthenticated = true;
        this.authService.isShowingLogin = false;
        const token = response.token; // Adjust according to your API response
        console.log('Logged in!' + token);
        this.authService.saveToken(token);
      },
      error: error => {
        console.error('Authenticate error:', error);
        this.authService.showError("Invalid email or password!", "Authentication Error");
      }
    });

  }

  isLoading()
  {
    return this.authService.isLoading;
  }
  closeForm() {
    this.authService.isShowingLogin = false;
  }
}
