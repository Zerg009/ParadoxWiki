import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from '../types/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  passwordMatched: boolean = true;
  constructor(private router: Router) { }

  login(form: LoginForm) {
    // // ignore multiple clicking
    // if (this.isLoading) return;

    // this.isLoading = true;
    // const auth = getAuth();

    // signInWithEmailAndPassword(auth, form.email, form.password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     alert('Logged In!');
    //     this.isAuthenticated = true;
    //     this.router.navigate(['']);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert(errorMessage);
    //     this.isAuthenticated = false;

    //   })
    //   .finally(() => {
    //     this.isLoading = false;
    //   })
  }

  register(form: RegisterForm) {
    // ignore multiple clicking
    // if (this.isLoading) return;

    // this.isLoading = true;

    // if (form.password != form.confirmPassword) {
    //   this.passwordMatched = false;
    //   alert("Passwords does not match!")
    //   this.isLoading = false;
    //   return;
    // }
    // const auth = getAuth();
    // createUserWithEmailAndPassword(auth, form.email, form.password)
    //   .then((userCredential) => {
    //     // Signed up 
    //     const user = userCredential.user;
    //     alert(`Email ${form.email} was successfully registered!`);
    //     this.isAuthenticated = true;

    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert("Something went wrong!");
    //     this.isAuthenticated = false;

    //   })
    //   .finally(() => { this.isLoading = false; })
  }

  logout() {
    // const auth = getAuth();
    // signOut(auth).then(() => {
    //     this.router.navigate(['login']);
    //     this.isAuthenticated = false;
    // }).catch((error) => {
    //   // An error happened.
    // });
  }
}
