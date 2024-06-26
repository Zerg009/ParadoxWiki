import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../types/Auth';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
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
  private verifySubject = new Subject<boolean>();

  // Public observables for login and logout events
  public login$: Observable<void> = this.loginSubject.asObservable();
  public logout$: Observable<void> = this.logoutSubject.asObservable();
  // public verify$: Observable<boolean> = this.verifySubject.asObservable();

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
    this.httpClient.post(`${this.baseURL}/authenticate`, form).subscribe({
      next: (response: any) => {
        this.isAuthenticated = true;
        const token = response.token;

        if (this.rememberMe)
          this.saveToken(token);
        else {
          const sessionStorage = this.getSessionStorage();
          if (sessionStorage) {
            sessionStorage.setItem('jwtToken', token); 
          }
        }

        // Notify subscribers about login event
        this.loginSubject.next(); 
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        this.showError('Invalid email or password!', 'Authentication Error');
      }
    });
  }

  register(form: RegisterForm): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/register`, form);

  }
  verify$():Observable<boolean>{
    return this.httpClient.get<{ authenticated: boolean }>('/api/verify-token').pipe(
      map(response => {
        this.isAuthenticated = response.authenticated;
        return this.isAuthenticated;
      }),
      catchError(error => {
        this.isAuthenticated = false;
        return of(false);
      })
    );
  }
  
  verifyToken(): Observable<boolean> {
    const token = this.getToken();
    if (token && token !== '') {
      return this.httpClient.post(`${this.baseURL}/verify`, { "token": token }).pipe(
        map((response: any) => {
          this.isAuthenticated = response.success;
          return this.isAuthenticated;
        }),
        catchError(error => {
          console.error('Error verifying token:', error);
          this.isAuthenticated = false;
          return of(false); // Return Observable<boolean> with false
        })
      );
    } else {
      this.isAuthenticated = false;
      return of(false); // Return Observable<boolean> with false
    }
  }

  logout() {
    // Clear the token from the cookie
    this.cookieService.delete('jwtToken');

    //localStorage.removeItem('firstname');
    this.isAuthenticated = false;

    const sessionStorage = this.getSessionStorage();
    if (sessionStorage) {
      sessionStorage.removeItem('jwtToken'); // Save the token in session storage for non-persistence
    }
    // Notify subscribers about logout
    this.logoutSubject.next();

  }

  saveToken(token: string): void {
    this.cookieService.set('jwtToken', token, 30, "/", '', false); // Expires in 30 day
  }

  getToken(): string | null {
    const sessionStorage = this.getSessionStorage();
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

  // used externally to show errors
  showNotLoggedInDialog(message: string, title: string): void {
    const dialogRef = this.dialog.open(AngularDialogComponent, {
      width: '500px',
      data: { message, title }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle confirm action
        this.router.navigate(['/login']);
      } else {
        // Handle cancel action
        console.log('Dialog cancelled');
      }
    });
  }

  getSessionStorage(): Storage | null {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  }
}
// decodeToken(token: string): any {
//   try {
//     return jwt_decode(token);
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// } 
