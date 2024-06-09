import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../types/Auth';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { AngularDialogComponent } from '../auth/angular-dialog/angular-dialog.component';
import * as jwt_decode from 'jwt-decode';
import { ParadoxListComponent } from '../paradox-list/paradox-list.component';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  passwordMatched: boolean = false;
  // _isShowingLogin: boolean = false;
  // _isShowingRegister: boolean = false;
  rememberMe: boolean = false;
  private baseURL = "http://localhost:8080/api/v1/auth";

  // Private subjects for login and logout events
  private loginSubject = new Subject<void>();
  private logoutSubject = new Subject<void>();
  private verifySubject = new Subject<void>();

  // Public observables for login and logout events
  public login$: Observable<void> = this.loginSubject.asObservable();
  public logout$: Observable<void> = this.logoutSubject.asObservable();
  public verify$: Observable<void> = this.verifySubject.asObservable();

  // // Getter for isShowingLogin
  // get isShowingLogin(): boolean {
  //   return this._isShowingLogin;
  // }

  // // Setter for isShowingLogin
  // set isShowingLogin(value: boolean) {
  //   this._isShowingLogin = value;
  // }

  // // Getter for isShowingRegister
  // get isShowingRegister(): boolean {
  //   return this._isShowingRegister;
  // }

  // // Setter for isShowingRegister
  // set isShowingRegister(value: boolean) {
  //   this._isShowingRegister = value;
  // }

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private dialog: MatDialog, private router: Router) { }

  login(form: LoginForm) {
    // Notify subscribers about login event

    this.httpClient.post(`${this.baseURL}/authenticate`, form).subscribe({
      next: (response: any) => {
        this.isAuthenticated = true;
        // this.isShowingLogin = false;
        const token = response.token; // Adjust according to your API response
        console.log('Logged in!', token);
        if(this.rememberMe)
          this.saveToken(token);
        else{
          const sessionStorage = getSessionStorage();
          if (sessionStorage) {
            sessionStorage.setItem('jwtToken', token); // Save the token in session storage for non-persistence
          }

        }
        this.router.navigate(['/']);
         
        this.loginSubject.next(); // Notify subscribers about login event
      },
      error: (error: any) => {
        console.error('Authentication error:', error);
        this.showError('Invalid email or password!', 'Authentication Error');
      }
    });
  }

  register(form: RegisterForm): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/register`, form);

  }
  verifyToken() {
    const token = this.getToken();
    if(token && token !=='')
    this.httpClient.post(`${this.baseURL}/verify`, { "token": token }).subscribe({
      next: (response: any) => {
        if (response.success)
          this.isAuthenticated = true;
        console.log("Cookie token:" + this.getToken());
        this.verifySubject.next();
      },
      error: error => {
        this.logout();
        console.log("Not logged in!");
      },
      complete: () => {

      }
    });
  }
  logout() {
    // Clear the token from the cookie
    this.cookieService.delete('jwtToken');
    
    //localStorage.removeItem('firstname');
    this.isAuthenticated = false;
    // Notify subscribers about logout
    this.logoutSubject.next();

  }
  saveToken(token: string): void {
    this.cookieService.set('jwtToken', token, 30, "/"); // Expires in 30 day
  }

  // getToken(): string {
  //   return this.cookieService.get('jwtToken');
  // }
  getToken(): string | null {
    const sessionStorage = getSessionStorage();
    if (sessionStorage) {
      return sessionStorage.getItem('jwtToken') || this.cookieService.get('jwtToken');
    }
    return this.cookieService.get('jwtToken');
  }
  // used externally to show errors
  showError(message: string, title: string): void {
    this.dialog.open(AngularDialogComponent, {
      width: '500px',
      data: { message, title }
    });
  }
  // decodeToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // } 
}
function getSessionStorage(): Storage | null {
  return typeof window !== 'undefined' ? window.sessionStorage : null;
}