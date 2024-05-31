import { Component } from '@angular/core';
import { RegisterForm } from '../../types/Auth';
import { AuthService } from '../../services/auth.service';

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
    if (this.form.password != this.form.confirmPassword) {
        this.authService.showError("Passwords dont match!", "Different Passwords");
      return;
    }


    this.authService.register(this.form).subscribe({
      next: goodResponse => {
        console.log('Authenticate response:', goodResponse);
        this.authService.isShowingRegister = false;
      },
      error: errorResponse => {
        console.log('Authenticate response:', errorResponse);

        this.authService.showError(errorResponse.error.message, "Register Error");
      }
    });;

  }
  isLoading()
  {
    return this.authService.isLoading;
  }
  closeForm() {
    this.authService.isShowingRegister = false;
  }
}
