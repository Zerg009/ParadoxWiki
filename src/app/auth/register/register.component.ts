import { Component } from '@angular/core';
import { RegisterForm } from '../../types/Auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: ''
  }

constructor (private authService: AuthService){}
  submit(){
    this.authService.register(this.form);
  }
  isLoading()
  {
    return this.authService.isLoading;
  }
}
